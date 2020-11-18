import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import Models from "../../../models/Models";
import dbConnect from "../../../../mongo/mongo.db";

interface MongoUser {
  _id: string;
  defaultImg: string;
  createdAt: string;
  name: string;
  email: string;
  avatar: any;
  type: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  console.log("user decoded");
  await dbConnect();
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      interface UserData {
        likes: Array<any>;
        credentials: any;
      }
      let userData: UserData = {
        likes: [],
        credentials: undefined,
      };

      try {
        const mongoUser: any = await Models.Usuario.findOne({
          name: user.user,
        });
        //const mongob64 = Buffer.from(mongoUser.avatar, "base64");
        //const mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;
        mongoUser.mongoImgString;

        const doc: any = await db.doc(`/users/${user.user}`).get();
        if (doc.exists) {
          userData.credentials = {
            ...doc.data(),
            ...mongoUser.toJSON(),
          };
          if (!userData.credentials.imageUrl) {
            userData.credentials.imageUrl =
              "./public/uploads/images/no-user-photo-png";
          }

          const likesDoc = await db
            .collection("likes")
            .where("user", "==", user.user)
            .get();

          likesDoc.forEach((doc) => {
            userData.likes.push(doc.data());
          });

          //agregar notificaciones aca

          return res.status(200).json({
            msg: "información de usuario obtenida con exito",
            data: userData,
          });
        }
      } catch (err) {
        return res.status(404).json({
          msg: "Algo falló al intentar obtener la información",
          error: err.code,
        });
      }

      break;
    default:
      return res.status(500).json({
        msg: "Error con el servidor",
      });
  }
};
