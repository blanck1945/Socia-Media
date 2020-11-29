import { NextApiResponse } from "next";
import Say from "../../../models/Say";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
      const ownSays = await Say.find({
        name: req.user.name,
      })
        .limit(10)
        .sort({ createdAt: -1 });

      return res.status(200).json({
        msg: "data fetch",
        ownSays,
        state: true,
      });
    } else {
      return res.status(404).json({
        msg: "Onyly GET Request accepted",
      });
    }
  }
);
