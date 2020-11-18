import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../mongo/mongo.db";
import Models from "../../../models/Models";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import fs from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      const timeStamp = dayjs().format("DD-MM-YYYY");
      const img = fs.readFileSync(`public/uploads/${timeStamp}/koyama.jpg`);

      const singleUser = await Models.Usuario.findOne({
        name: user.user,
      });
      singleUser.coverImagePath;

      const mongob64 = Buffer.from(singleUser.avatar, "base64");
      const mongoImgString = `data:image/jpg;base64,${mongob64}`;

      return res.status(200).json({
        msg: "Data fetch",
        img: img,
        mongoUser: {
          ...singleUser.toJSON(),
          mongoImgString,
        },
      });

      break;
    default:
      return res.status(500).json({
        msg: "Error de servidor",
      });
  }
};
