const admin = require("firebase-admin");
const ServiceAccount = require("../type-todo-firebase-adminsdk-f0g9i-302c361f3d.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount),
      databaseURL: "https://type-todo.firebaseio.com",
    });
  }

  return admin.auth().verifyIdToken(token).catch((error) => {
    throw error
  })
};

export const firebaseAdmin = admin;
