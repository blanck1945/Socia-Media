import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../mongo/mongo.db";
import Models from "../../../models/Models";
import { validateYupSchema } from "../../../../YupSchemas/YupSchemas";
import { SignUpSchema } from "../../../validators/AuthSchema";

export default validateYupSchema(
  SignUpSchema,
  async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
      case "POST":
        try {
          const mongoCredentials = {
            name: req.body.user,
            email: req.body.email,
          };

          const newMongoUser = await Models.Usuario.create(mongoCredentials);

          res.status(201).json({
            msg: `user ${newMongoUser._id} creado con exito`,
          });
        } catch (err) {
          console.log(err);
          res.status(404).json({
            msg: "Error en la creación",
            error: err.code,
          });
        }
        break;
      default:
        res.status(500).json({
          msg: "Error de Servidor, por favor,intente de nuevo",
        });
    }
  }
);
