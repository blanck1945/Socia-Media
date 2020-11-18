import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../../firebase/firebaseClient";
import dbConnect from "../../../../../mongo/mongo.db";
import Models from "../../../../models/Models";
import { firebaseAuthUser } from "../../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = await firebaseClient();
  const db = firebase.firestore();
  await dbConnect();

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
      console.log(sayingGET.data().user);

      let mongoImgString;

      await Models.Usuario.findOne(
        {
          name: sayingGET.data().user,
        },
        (err, mongoUser) => {
          if (mongoUser) {
            const mongob64 = Buffer.from(mongoUser.avatar, "base64");
            mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;
          }
        }
      );

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

            const say = {
              ...sayDATA,
              mongoImgString: mongoImgString,
            };

            return res.status(201).json({
              data: say,
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
