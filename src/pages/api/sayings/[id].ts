import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import { firebaseAuthUser } from "../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  const doc = await db.doc(`/sayings/${req.query.id}`);
  const docGET = await doc.get();
  switch (method) {
    case "GET":
      const comments = await db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("sayingId", "==", req.query.id)
        .get();

      let commentsArr = [];
      comments.forEach((doc) => {
        commentsArr.push(doc.data());
      });

      const response = {
        data: docGET.data(),
        saiyngId: doc.id,
        comments: [...commentsArr],
      };

      res.status(200).json({
        msg: "Información obtenida",
        data: response,
      });
      break;
    case "DELETE":
      const user = await firebaseAuthUser(req, res);
      console.log(docGET);

      if (!docGET.exists) {
        console.log("using this route");
        return res.status(404).json({
          msg: "Dicho no encontrado",
        });
      }
      try {
        if (docGET.data().user !== user.user) {
          return res.status(403).json({
            msg: "No estas autorizado para realizar esa acción",
          });
        } else {
          await doc.delete();

          const comments = await db
            .collection("comments")
            .where("sayingId", "==", doc.id)
            .get();
          const likes = await db
            .collection("likes")
            .where("sayingId", "==", doc.id)
            .get();

          comments.forEach((comment) => {
            comment.ref.delete();
          });
          likes.forEach((like) => {
            like.ref.delete();
          });

          return res.status(200).json({
            msg: "Dicho, comentarios y likes eliminados exitosamente",
          });
        }
      } catch (err) {
        return res.status(500).json({
          msg: "Error de servidor",
          error: err,
        });
      }
      break;
  }
};
