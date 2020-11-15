import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../../../firebase/firebaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      const doc = await db.doc(`/users/${req.query.user}`).get();

      if (doc.exists) {
        const sayDoc = await db
          .collection("sayings")
          .where("user", "==", req.query.user)
          .orderBy("createdAt", "desc");

        const dataArr = [];
        const sayGET = await sayDoc.get();
        console.log(sayGET);

        sayGET.forEach((doc) => {
          dataArr.push({
            body: doc.data().body,
            createdAt: doc.data().createdAt,
            user: doc.data().user,
            userImage: doc.data().userImage,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
            sayingId: doc.id,
          });
        });

        const userData = {
          ...doc.data(),
          sayings: dataArr,
        };

        return res.status(200).json({
          data: userData,
          msg: "recibiendo la información del usuario",
        });
      } else {
        return res.status(404).json({
          msg: "No existe un usuario con ese nombre",
        });
      }
      break;
  }
};
