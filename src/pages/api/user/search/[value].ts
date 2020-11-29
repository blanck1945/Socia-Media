import { NextApiResponse } from "next";
import Usuario from "../../../../models/User";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
      const { value } = req.query;

      const searchResult = await Usuario.paginate({
        name: {
          $regex: value,
          $options: "i",
        },
      });

      return res.status(200).json({
        msg: "Search complete",
        searchResult: searchResult,
      });
    } else {
      return res.status(404).json({
        msg: "Only GET request",
      });
    }
  }
);
