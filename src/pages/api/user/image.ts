require("dotenv").config();
import "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import { nanoid } from "nanoid";
import slugify from "slugify";
import mkdirp from "mkdirp";
import dayjs from "dayjs";

import formidable from "formidable-serverless";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      const data = await db
        .collection("users")
        .where("userId", "==", user.uid)
        .get();
      return res.status(200).json({
        msg: "usuario",
        data: data.docs[0].data(),
      });
      break;
    case "POST":
      const token = nanoid();
      const timeStamp = dayjs().format("DD-MM-YYYY");

      // const pathExist = fs.existsSync(`/public/uploads/${timeStamp}`);
      fs.mkdir(`./public/uploads/${timeStamp}`, { recursive: true }, (err) => {
        if (err) {
          return res.status(404).json({
            msg: "error creado el directorio",
          });
        } else {
          console.log("directorio creado");
        }
      });

      const FBuser = await db.doc(`/users/${user.user}`).get();
      const image = "./public/" + FBuser.data().imageUrl;
      const form = new formidable({
        multiple: true,
        uploadDir: `./public/uploads/${timeStamp}`,
      });
      form.keepExtensions = true;
      form.keepFileName = true;
      console.log(image);
      if (fs.existsSync(image)) {
        try {
          await form.on("fileBegin", async function (name, file) {
            file.name = token + "-" + file.name;
            file.path = path.join(
              `./public/uploads/${timeStamp}/`,
              slugify(file.name)
            );
            fs.writeFile(file.path, "new pic", (err) => {
              if (err) {
                console.log(err);
              }
            });
            console.log("creatig new pic");

            const imagePath = `/uploads/${timeStamp}/${slugify(file.name)}`;
            await db.doc(`/users/${user.user}`).update({ imageUrl: imagePath });
            const userSayings = await db
              .collection("sayings")
              .where("user", "==", user.user)
              .get();

            userSayings.forEach((doc) => {
              doc.ref.update({
                userImage: imagePath,
              });
            });
          });

          form.parse(req, (err, fields, file) => {
            if (err) {
              return res.status(404).json({
                msg: "No se pudo cargar la imagén",
              });
            }
          });

          fs.unlink(image, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("image borrada con exito");
            }
          });

          res.status(200).json({
            msg: "imagén cargada con exito",
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          form.on("fileBegin", async function (name, file) {
            console.log("we reach here");
            file.name = token + "-" + file.name;
            file.path = path.join(
              `./public/uploads/${timeStamp}/`,
              slugify(file.name)
            );
            fs.writeFile(file.path, "new pic", (err) => {
              if (err) {
                console.log(err);
              }
            });
            const imagePath = `/uploads/${timeStamp}/${slugify(file.name)}`;

            await db.doc(`/users/${user.user}`).update({ imageUrl: imagePath });
          });

          form.parse(req, (err, fields, file) => {
            if (err) {
              return res.status(404).json({
                msg: "No se pudo cargar la imagén",
              });
            }
          });
          console.log("sending res");
          return res.status(200).json({
            msg: "imagén cargada con exito",
          });
        } catch (err) {
          return res.status(404).json({
            msg: "No se pudo cargar la foto",
            err: err,
          });
        }
      }

      break;
    default:
      return res.status(500).json({
        msg: "ERROR de servidor",
      });
  }
};
