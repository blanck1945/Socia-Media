import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../mongo/mongo.db";
import Usuario from "../../../models/User";
import Say from "../../../models/Say";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    await dbConnect();

    const mongoUser = await Usuario.findOne({
      name: req.query.user,
    });

    const userSays = await Say.paginate({
      name: mongoUser.name,
    });

    return res.status(200).json({
      msg: "User fetch",
      userSays,
      mongoUser,
    });
  } else {
    return res.status(404).json({
      msg: "Only GET Request",
    });
  }
};
