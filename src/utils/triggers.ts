import { firebaseClient } from "../../firebase/firebaseClient";
const functions = require("firebase-functions");

export const createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(async (snapshot) => {
    const firebase = await firebaseClient();
    const db = firebase.firestore();

    const doc = await db.doc(`/sayings/${snapshot.data().sayingId}`).get();

    if (doc.exists) {
      try {
        await db.doc(`/notification/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().user,
          sender: snapshot.data().user,
          type: "like",
          read: false,
          sayingId: doc.id,
        });

        return;
      } catch (err) {
        console.log(err);
        return;
      }
    }
  });

export const deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete(async (snapshot) => {
    const firebase = await firebaseClient();
    const db = firebase.firestore();

    try {
      const doc = await db.doc(`/notifications/${snapshot.id}`).delete();
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  });

export const createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(async (snapshot) => {
    const firebase = await firebaseClient();
    const db = firebase.firestore();

    const doc = await db.doc(`/sayings/${snapshot.data().sayingId}`).get();

    if (doc.exists) {
      try {
        await db.doc(`/notification/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().user,
          sender: snapshot.data().user,
          type: "comment",
          read: false,
          sayingId: doc.id,
        });

        return;
      } catch (err) {
        console.log(err);
        return;
      }
    }
  });
