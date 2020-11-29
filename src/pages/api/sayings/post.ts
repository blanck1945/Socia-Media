import { NextApiResponse } from "next";
import dbConnect from "../../../../mongo/mongo.db";
import Usuario from "../../../models/User";
import Say from "../../../models/Say";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    await dbConnect();

    const { method } = req;

    if (method === "POST") {
      const mongoUser = await Usuario.findOne({
        _id: req.user.id,
      });

      const mongob64 = Buffer.from(mongoUser.avatar, "base64");
      const mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;

      const newSay = {
        body: req.body.body,
        name: mongoUser.name,
        mongoImgString: mongoImgString,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };

      await Say.create(newSay, (err, say) => {
        if (err) {
          return res.status(404).json({
            msg: "Something went wrong",
          });
        } else {
          return res.status(201).json({
            msg: "Say created",
            say,
          });
        }
      });
    } else {
      return res.status(404).json({
        msg: "Only POST operation in this route",
      });
    }
  }
);
