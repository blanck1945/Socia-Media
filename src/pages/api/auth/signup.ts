import dot from "dotenv";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRequest } from "../../../validators/signin";
import { authenticateUser } from "../../../utils/authenticateUser";
import dbConnect from "../../../../mongo/mongo.db";
import Models from "../../../models/Models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const validators = validateRequest(res, req.body);
  if (!validators) {
    return validators;
  }

  dot.config();
  const firebase = await firebaseClient();
  await dbConnect();
  const db = firebase.firestore();
  const auth = firebase.auth();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await authenticateUser(res);

        const doc = await db.doc(`/user/${req.body.user}`).get();
        if (doc.exists) {
          return res.status(400).json({
            user: "This user is already taken",
          });
        }

        const newUser = await auth.createUserWithEmailAndPassword(
          req.body.email,
          req.body.password
        );

        const mongoCredentials = {
          name: req.body.user,
          email: req.body.email,
        };

        const newMongoUser = await Models.Usuario.create(mongoCredentials);

        const token = await newUser.user.getIdToken();
        const userCredentials = {
          user: req.body.user,
          email: req.body.email,
          userId: newUser.user.uid,
          userMongoId: newMongoUser._id.toString(),
        };

        await db.doc(`/users/${req.body.user}`).set(userCredentials);

        res.status(201).json({
          msg: `user ${newMongoUser._id} creado con exito`,
          token: token,
        });
      } catch (err) {
        console.log(err);
        res.status(404).json({
          msg: "Error en la creación",
          error: err.code,
        });
      }
      break;
    default:
      res.status(500).json({
        msg: "Error de Servidor, por favor,intente de nuevo",
      });
  }
};
