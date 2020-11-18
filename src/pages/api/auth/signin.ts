import { NextApiRequest, NextApiResponse } from "next";
import { validateRequest } from "../../../validators/signin";
import { authenticateUser } from "../../../utils/authenticateUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const validation = validateRequest(res, req.body);
  if (!validation) {
    return validation;
  }

  const { method } = req;

  switch (method) {
    case "POST":
      const logUser = await authenticateUser(res, req.body);
      if (!logUser) {
        return res.status(404).json({
          msg: "No user was authenticated",
        });
      }
      const token = await logUser.user.getIdToken();
      res.status(200).json({
        msg: "Usuario loggeado",
        token: token,
      });
  }
};
