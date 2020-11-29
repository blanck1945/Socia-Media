import { NextApiRequest, NextApiResponse } from "next";
import Usuario from "../../models/User";
import dbConnect from "../../../mongo/mongo.db";
import Say from "../../models/Say";
import { AuthenticateUserMiddleware } from "../../utils/AuthenticateMiddleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      const mongoSays = await Say.find({}).sort({ createdAt: -1 });
      return res.status(200).json({
        sayings: mongoSays,
      });
      break;
    default: {
      res.status(404).json({
        msg: "Error fetching data",
      });
    }
  }
};
