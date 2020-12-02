import Cors from "cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { validateYupSchema } from "../../YupSchemas/YupSchemas";
import { SignInSchema } from "../validators/AuthSchema";
import authMiddleware from "./InitMiddleware";

// Initialize the cors middleware
const cors = authMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export const CorsMiddleware = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);

  return await fn(req, res);
};
