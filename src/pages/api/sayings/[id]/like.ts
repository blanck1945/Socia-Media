import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../../firebase/firebaseClient";
import { firebaseAuthUser } from "../../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      const likeDoc = await db
        .collection("likes")
        .where("user", "==", user.user)
        .where("sayId", "==", req.query.id)
        .limit(1);

      const sayingDoc = await db.doc(`/sayings/${req.query.id}`);
      const sayingGET = await sayingDoc.get();

      try {
        if ((await sayingGET).exists) {
          const sayDATA = sayingGET.data();
          sayDATA.sayingId = sayingGET.id;
          const likeGET = await likeDoc.get();

          if (likeGET.empty) {
            await db.collection("likes").add({
              user: user.user,
              sayId: req.query.id,
            });

            sayDATA.likeCount++;
            //await createNotificationOnLike();

            await sayingDoc.update({
              likeCount: sayDATA.likeCount,
            });

            return res.status(201).json({
              data: sayDATA,
              msg: "Dicho likeado",
            });
          } else {
            return res.status(404).json({
              msg: "dicho ya likeado",
            });
          }
        } else {
          return res.status(404).json({
            msg: "Dicho no existe",
          });
        }
      } catch (err) {
        res.status(500).json({
          msg: "Error de servidor",
        });
      }
  }
};
