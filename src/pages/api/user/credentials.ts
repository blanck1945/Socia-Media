import { NextApiResponse } from "next";
import dbConnect from "../../../../mongo/mongo.db";
import Usuario from "../../../models/User";
import Like from "../../../models/Like";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
      await dbConnect();

      const mongoUser = await Usuario.findOne({
        _id: req.user.id,
      });

      const mongoLikes = await Like.find({
        name: mongoUser.name,
      });

      const mongob64 = Buffer.from(mongoUser.avatar, "base64");
      const mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;
      mongoUser.set("avatar", null);

      return res.status(200).json({
        msg: "user pass",
        userData: {
          credentials: {
            ...mongoUser.toJSON(),
            mongoImgString,
          },
          likes: mongoLikes,
        },
        state: true,
      });
    } else {
      return res.status(404).json({
        msg: "Only GET request are permited",
      });
    }
  }
);
