import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Usuario from "../models/User";

export interface SayApiRequest extends NextApiRequest {
  user: {
    id: string;
    name: string;
  };
}

export const AuthenticateUserMiddleware = (fn: NextApiHandler) => async (
  req: SayApiRequest,
  res: NextApiResponse
) => {
  await verify(
    req.cookies.auth!,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        req.user = decoded;
        return await fn(req, res);
      }
      res.status(401).json({
        msg: "Authentication problem",
        state: false,
      });
    }
  );
};
