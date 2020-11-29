import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../../firebase/firebaseClient";
import { firebaseAuthUser } from "../../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      let comments = [];
      console.log(req.query.id);
      const data = await db
        .collection("comments")
        .where("sayingId", "==", req.query.id);

      const dataGET = await data.get();
      dataGET.docs.forEach((doc) => {
        comments.push(doc.data());
      });

      return res.status(200).json({
        msg: "Comments",
        comments: comments,
      });

    case "POST":
      const user = await firebaseAuthUser(req, res);
      console.log(req.body);

      const newComment = {
        body: req.body.comment,
        user: user.user,
        sayingId: req.query.id,
        createdAt: new Date().toISOString(),
        imageUrl: user.imageUrl,
      };

      console.log(newComment);

      try {
        const doc = await db.doc(`/sayings/${req.query.id}`).get();

        if (!doc.exists) {
          return res.status(404).json({
            msg: "Dicho no existe",
          });
        }

        await doc.ref.update({
          commentCount: doc.data().commentCount + 1,
        });
        await db.collection("comments").add(newComment);

        res.status(201).json({
          msg: "comentario agregado con exito",
          data: newComment,
        });
      } catch (err) {
        res.status(404).json({
          msg: "Error al crear comentario",
          error: err.code,
        });
      }
  }
};
