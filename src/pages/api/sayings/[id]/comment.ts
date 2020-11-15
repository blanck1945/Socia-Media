import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../../firebase/firebaseClient";
import { firebaseAuthUser } from "../../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "POST":
      if (req.body.body.trim() === "") {
        return res.status(404).json({ comment: "no puede estar vacio" });
      }

      const newComment = {
        body: req.body.body,
        user: user.user,
        sayingId: req.query.id,
        createdAt: new Date(),
        imageUrl: user.imageUrl,
      };

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
