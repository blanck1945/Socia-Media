import { NextApiResponse } from "next";
import Usuario from "../../../../models/User";
import FriendList from "../../../../models/Friend";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method !== "POST") {
      return res.status(404).json({
        msg: "Only POST request accepted",
      });
    } else {
      const usertToAdd = await Usuario.findOne({
        _id: req.query.userId,
      });

      const friendList = await FriendList.findOne({
        _id: req.user.id,
      });

      await friendList.friends.push(usertToAdd);

      res.status(201).json({
        msg: "Friend added to your list",
      });
    }
  }
);
