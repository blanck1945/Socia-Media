import { NextApiRequest, NextApiResponse } from "next";
import {
  authenticateUser,
  firebaseAuthUser,
} from "../../utils/authenticateUser";
import { firebaseClient } from "../../../firebase/firebaseClient";
import Models from "../../models/Models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firebase = firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "GET":
      await authenticateUser(res);

      let sayings = [];
      const fbData = await db
        .collection("sayings")
        .orderBy("createdAt", "desc")
        .get();

      const users = await Models.Usuario.find({});

      fbData.docs.forEach((doc) => {
        sayings.push({
          sayingId: doc.id,
          ...doc.data(),
        });
      });

      const getMongoImg = async (usuario) => {
        return await Models.Usuario.findOne({
          name: usuario,
        })
          .exec()
          .then((mongoUser) => {
            if (!mongoUser) {
              return "No user in Mongo DB";
            } else {
              const mongob64 = Buffer.from(mongoUser.avatar, "base64");
              const mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;
              return mongoImgString;
            }
          });
      };

      const makeArr = (sayings) => {
        return sayings.map(async (el) => {
          return {
            ...el,
            mongoImgString: await getMongoImg(el.user),
          };
        });
      };

      const sayArr = await Promise.all(makeArr(sayings));

      return res.status(200).json({
        sayings: sayArr,
      });
      break;
    case "POST":
      const user = await firebaseAuthUser(req, res);
      const data = await db
        .collection("users")
        .where("userId", "==", user.uid)
        .limit(1)
        .get();

      user.user = data.docs[0].data().user;

      const newDicho = {
        body: req.body.body,
        user: user.user,
        userImage: user.imageUrl,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };
      console.log(newDicho);

      try {
        const doc = await db.collection("sayings").add(newDicho);
        const response = {
          ...newDicho,
          sayingId: doc.id,
        };

        res.status(201).json({
          data: response,
          msg: `documento ${doc.id} creado exitosamente`,
        });
      } catch (err) {
        res.status(404).json({
          msg: "Algo fue mal",
        });
      }
      break;
    default: {
      res.status(404).json({
        msg: "Error fetching data",
      });
    }
  }
};
