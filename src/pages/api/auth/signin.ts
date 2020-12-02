import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import Usuario from "../../../models/User";
import Like from "../../../models/Like";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../mongo/mongo.db";
import { validateYupSchema } from "../../../../YupSchemas/YupSchemas";
import { SignInSchema } from "../../../validators/AuthSchema";
import { CorsMiddleware } from "../../../utils/CorsMiddleware";

export default CorsMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "POST":
        try {
          const { email } = req.body;

          const mongoUser = await Usuario.findOne({ email });

          if (!mongoUser) {
            return res.status(404).json({
              msg: "No user was authenticated",
            });
          }

          const mongoLikes = await Like.find({
            name: mongoUser.name,
          });

          let mongoImgString = "";

          if (mongoUser.avatar) {
            const mongob64 = Buffer.from(mongoUser.avatar, "base64");
            mongoImgString = `data:${mongoUser.type};base64,${mongob64}`;
            mongoUser.set("avatar", null);
          }

          const token = jwt.sign(
            { id: mongoUser._id, name: mongoUser.name },
            process.env.JWT_SECRET
          );
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600 * 2,
              path: "/",
            })
          );

          res.status(200).json({
            msg: "Usuario loggeado",
            userData: {
              credentials: {
                ...mongoUser.toJSON(),
                mongoImgString,
              },
              likes: mongoLikes,
            },
          });
        } catch (err) {
          return res.status(404).json({
            msg: "Error",
            err: err,
          });
        }
    }
  }
);
