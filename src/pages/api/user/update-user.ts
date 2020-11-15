import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthUser } from "../../../utils/authenticateUser";
import { firebaseClient } from "../../../../firebase/firebaseClient";
import { validateRequest } from "../../../validators/signin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await firebaseAuthUser(req, res);
  const firebase = await firebaseClient();
  const db = firebase.firestore();

  const { method } = req;

  switch (method) {
    case "POST":
      delete req.body.openDetails;
      //const validation = validateRequest(res, req.body);

      try {
        await db.doc(`/users/${user.user}`).update(req.body);
        return res.status(200).json({
          msg: "Usuario actualizado con exito",
        });
      } catch (err) {
        return res.status(404).json({
          msg: "No se pudo actualizar el usuario",
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Error de servidor",
      });
  }
};
