import { NextApiResponse } from "next";
import Say from "../../../../models/Say";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
      const navSayings = await Say.paginate({
        name: req.query.user,
      });
      console.log("using this route");

      return res.status(200).json({
        msg: "Data fetch",
        navSayings,
      });
    } else {
      return res.status(404).json({
        msg: "Onyl GET request",
      });
    }
  }
);
