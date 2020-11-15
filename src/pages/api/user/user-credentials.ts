import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient } from "../../../../firebase/firebaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      let userData = {
        likes: [],
        credentials: {},
      };
      const doc = await db.doc(`/users/${user.user}`).get();
      try {
        if (doc.exists) {
          userData.credentials = { ...doc.data() };
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
