import { firebaseClient } from "../../firebase/firebaseClient";
import { verifyIdToken } from "../../firebase/firebaseAdmin";

export const firebaseAuthUser = async (req, res) => {
  const firebase = firebaseClient();
  const db = firebase.firestore();

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
    const logUser = await getAuthenticateUser(idToken);
    return logUser;
  } else {
    return res.status(403).json({
      msg: "Request no cuenta con la autorización necesaria",
    });
  }
};

const getAuthenticateUser = async (token) => {
  const decodedToken = await verifyIdToken(token);
  const logUser = decodedToken;
  const firebase = firebaseClient();
  const db = firebase.firestore();

  const data = await db
    .collection("users")
    .where("userId", "==", logUser.uid)
    .limit(1)
    .get();

  logUser.user = data.docs[0].data().user;
  logUser.imageUrl = data.docs[0].data().imageUrl
    ? data.docs[0].data().imageUrl
    : "./public/uploads/images/no-user-photo-png";
  logUser.userMongoId = data.docs[0].data().userMongoId
    ? data.docs[0].data().userMongoId
    : null;

  return logUser;
};

export const authenticateUser = async (res, user?) => {
  const firebase = firebaseClient();
  const auth = firebase.auth();

  const errorMsg = "autenticación de usuario falló";
  if (!user) {
    user = {
      email: "vane990@gmail.com",
      password: "123456",
    };
  }

  try {
    const authenticateUser = await auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    return authenticateUser;
  } catch (err) {
    if (err.code === "auth/wrong-password") {
      return res.status(403).json({
        msg: errorMsg,
        error: err.code,
      });
    }
    return res.status(404).json({
      msg: errorMsg,
      error: err,
    });
  }
};
