import { NextApiResponse } from "next";
import Models from "../../../models/Models";
import {
  AuthenticateUserMiddleware,
  SayApiRequest,
} from "../../../utils/AuthenticateMiddleware";

export default AuthenticateUserMiddleware(
  async (req: SayApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "POST") {
      delete req.body.openDetails;
      const mongoUser = await Models.Usuario.findOne({
        name: req.user.name,
      });

      (mongoUser.location = req.body.location),
        (mongoUser.website = req.body.website),
        (mongoUser.bio = req.body.bio);

      await mongoUser.save();

      return res.status(200).json({
        msg: "Usuario actualizado con exito",
      });
    } else {
      return res.status(404).json({
        msg: "Only POST request",
      });
    }
  }
);
