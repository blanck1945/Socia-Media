import env from "dotenv";
import dbConnect from "../../../../mongo/mongo.db";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient, bucket } from "../../../../firebase/firebaseClient";
import Usuario from "../../../models/User";
var Binary = require("mongodb").Binary;
import multiparty from "multiparty";
import http from "http";
import util from "util";

import { nanoid } from "nanoid";
import slugify from "slugify";
import { firebaseAdmin } from "../../../../firebase/firebaseAdmin";
import dayjs from "dayjs";

//import formidable from "formidable-serverless";
import path from "path";
import fs from "fs";
import os from "os";

env.config();

/*export const config = {
  api: {
    bodyParser: false,
  },
};*/

import formidable from "formidable";
import Models from "../../../models/Models";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    await dbConnect();

    const { method } = req;

    if (method === "POST") {
      const mongoUser = await Models.Usuario.findOne({
        name: req.user.name,
      });
      console.log(mongoUser);

      const data: any = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
          multiples: true,
          keepExtensions: true,
        });

        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });
      const image = fs.readFileSync(data.files.avatar.path);
      const buf = Buffer.from(data.files.avatar.path);

      mongoUser.avatar = image.toString("base64");
      mongoUser.type = data.files.avatar.type;
      mongoUser.defaultImg = "none";
      await mongoUser.save();
      return res.status(200).json({
        mongoUser,
        msg: "Data send",
      });
    } else {
      return res.status(404).json({
        msg: "Only POST request",
      });
    }
  }
);

/*  form.once("error", console.error);
        form.on("fileBegin", (name, file) => {
          console.log("start uploading: ", file.name);
          const timeStamp = dayjs().format("DD-MM-YYYY");

          if (fs.existsSync(`public/uploads/${timeStamp}/`)) {
            const data = fs.readFileSync(os.tmpdir + file.name);
            fs.writeFileSync(
              `public/upload/${timeStamp}/social-${file.name}`,
              data
            );
          } else {
            fs.mkdir(
              `public/uploads/${timeStamp}`,
              { recursive: true },
              (err) => {
                if (err) {
                  return err;
                }
              }
            );
          }
        });*/

export const config = {
  api: {
    bodyParser: false,
  },
};

/*
const data: any = await new Promise((resolve, reject) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    resolve({ fields, files });
  });
});*/

/*export default async (req: NextApiRequest, res: NextApiResponse) => {
  //const user = await firebaseAuthUser(req, res);
  const firebase = firebaseClient();
  const db = firebase.firestore();
  //const mongoDb = await mongoConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      const data = await db
        .collection("users")
        .where("userId", "==", "moeppi")
        .get();
      return res.status(200).json({
        msg: "usuario",
        data: data.docs[0].data(),
      });
    case "POST":
      const form = new formidable({
        multiple: true,
      });
      form.keepExtensions = true;
      form.keepFileName = true;
      console.log("using this route");

      form.on("fileBegin", async function (name, file) {
        console.log(file.name);

        return res.status(404).json({
          msg: "returning data",
        });
      });

      return;

      const { name, email, image } = req.body;

      const newUser = new Usuario({
        name: req.body.name,
        email: req.body.email,
      });

      console.log(newUser);

      saveImage(newUser, req.body.image);

      try {
        await newUser.save();

        return res.status(200).json({
          msg: "user created",
          data: newUser,
        });
      } catch (err) {
        res.status(404).json({
          msg: "Something went wrong saving the photo",
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "ERROR de servidor",
      });
  }
};*/

/*
const saveImage = (user, imgEncoded) => {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (imgEncoded === null) return;

  console.log(imgEncoded);

  const img = imgEncoded;

  if (img !== null && imageTypes.includes(img.type)) {
    user.image = Buffer.from(img.data, "base64");
    user.imageType = img.type;
  }
};*/

/*
 file.path = path.join(
              basePath + timeStamp + "/" + slugify(file.name)
            );
            fs.writeFile(file.path, "new pic", (err) => {
              if (err) {
                console.log(err);
              }
            });

            const imagePath = basePath + timeStamp + "/" + slugify(file.name);*/

/*
            case "POST":
      const token = nanoid();
      const timeStamp = dayjs().format("DD-MM-YYYY");

      const basePath =
        process.env.NODE_ENV === "development"
          ? "./public/uploads/"
          : "./uploads/";

      const pathExist = fs.existsSync(basePath + timeStamp);
      if (!pathExist) {
        fs.mkdir(basePath + timeStamp, { recursive: true }, (err) => {
          console.log(basePath + timeStamp);
          if (err) {
            return res.status(404).json({
              msg: "error creado el directorio",
            });
          } else {
            console.log("directorio creado");
          }
        });
      }

      const FBuser = await db.doc(`/users/${user.user}`).get();
      const image = "./public/" + FBuser.data().imageUrl;
      const form = new formidable({
        multiple: true,
        uploadDir: basePath + timeStamp,
      });
      form.keepExtensions = true;
      form.keepFileName = true;
      const exi = true;
      if (exi) {
        try {
          await form.on("fileBegin", async function (name, file) {
            file.name = token + "-" + file.name;
            file.path = path.join(os.tmpdir(), file.name);
            console.log(file.path);

            console.log("Declare path and uploading new pic");

            await firebaseAdmin
              .storage()
              .bucket(bucket)
              .upload(file.path, {
                resumable: false,
                metadata: {
                  metadata: {
                    contentType: file.type,
                    //Generate token to be appended to imageUrl
                  },
                },
              });

            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${file.name}?alt=media`;

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

      break;*/
