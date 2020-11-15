require("dotenv").config();
import "firebase/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import { nanoid } from "nanoid";
import slugify from "slugify";
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

      fs.mkdir(`/images/${timeStamp}`, { recursive: true }, (err) => {
        if (err) {
          return res.status(400).json({
            msg: "no hay directorio",
            err: err,
          });
        }
      });

      const FBuser = await db.doc(`/users/${user.user}`).get();
      const image = "./public" + FBuser.data().imageUrl;

      const form = new formidable({
        multiple: true,
        uploadDir: `/uploads/${timeStamp}`,
      });
      form.keepExtensions = true;
      form.keepFileName = true;
      if (fs.existsSync(image)) {
        try {
          form.on("fileBegin", async function (name, file) {
            file.name = token + "-" + file.name;
            file.path = path.join(
              `./public/images/${timeStamp}`,
              slugify(file.name)
            );

            const imageUrl = `/images/${timeStamp}/${slugify(file.name)}`;
            await db.doc(`/users/${user.user}`).update({ imageUrl });

            const userSayings = await db
              .collection("sayings")
              .where("user", "==", user.user)
              .get();

            userSayings.forEach((doc) => {
              doc.ref.update({
                userImage: imageUrl,
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
            file.name = token + "-" + file.name;
            file.path = path.join(
              `./public/uploads/${timeStamp}`,
              slugify(file.name)
            );

            const imageUrl = `/uploads/${timeStamp}/${slugify(file.name)}`;
            await db.doc(`/users/${user.user}`).update({ imageUrl });
          });

          form.parse(req, (err, fields, file) => {
            if (err) {
              return res.status(404).json({
                msg: "No se pudo cargar la imagén",
              });
            }
          });

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
      res.status(500).json({
        msg: "ERROR de servidor",
      });
  }
};
