import { NextApiResponse } from "next";
import dbConnect from "../../../../../mongo/mongo.db";
import Like from "../../../../models/Like";
import Say from "../../../../models/Say";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    await dbConnect();

    const { method } = req;

    if (method === "GET") {
      const mongoLike = await Like.findOne({
        name: req.user.name,
        sayId: req.query.id,
      });

      if (mongoLike) {
        return res.status(404).json({
          msg: "Already Like",
        });
      }

      const mongoSay = await Say.findOne({
        _id: req.query.id,
      });

      mongoSay.likeCount = mongoSay.likeCount + 1;
      await mongoSay.save();

      await Like.create({
        sayId: mongoSay._id,
        name: req.user.name,
      });

      return res.status(200).json({
        msg: "Dicho likeado",
        mongoSay,
      });
    } else {
      return res.status(404).json({
        msg: "Only GET request",
      });
    }
  }
);
