import { createUser } from './../model/users';
import { firebaseApp, firestoreDb } from "./FireStore";
import { v4 } from "uuid";

export const signUpApi = async ({ username, email, password }: any) => {
  let resp: any = {};
  let user;
  let message: string = "";
  try {
    resp = await firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log("Error ", error);
    return { user, message: error.message };
  }
  const userId = v4();
  const signedUpUser = createUser(username, email, password, resp.user.uid, userId);

  const docRef = await firestoreDb.collection("users").doc(userId);
  await docRef.set(signedUpUser);
  return { signedUpUser, message };
};

export const signInApi = async ({ email, password }: any) => {
  let resp: any = {};
  let signedInUser;
  let message: string = "";
  try {
    resp = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return { signedInUser, message: error.message };
  }
  const fetchUser = await firestoreDb
    .collection("users")
    .where("email", "==", resp.user.email)
    .get();
  fetchUser.forEach((doc: any) => {
    signedInUser = doc.data();
  });
  return { signedInUser, message };
};

export const fetchNotFriendContacts = async (user: any) => {
  //  find users which does not exist in user.friends
  let emails: string[] = user.friends.map((item: any) => item.email);
  emails = emails || [];

  emails.push(user.email);
  const limit = 50;
  let fetchData = await firestoreDb.collection("users").limit(limit).get();

  const users: any[] = [];
  fetchData.forEach((doc: any) => {
    const user = doc.data();
    if (!emails.includes(user.email)) {
      users.push(user);
    }
  });

  return users;
};

export const findUser: any = async (userId: string) => {
  const customer = await firestoreDb.collection("users").doc(userId);
  const user = (await customer.get()).data();
  return user;
};

export const fetchMessages = async ({
  channel1,
  channel2,
  limit = 0,
  orderBy = "",
  onSnapshotCB,
}: any) => {
  let prefetchData = await firestoreDb
    .collection("messages")
    .where("channel", "in", [channel1, channel2]);

  if (orderBy) {
    prefetchData = await prefetchData.orderBy("time", orderBy);
  } else {
    prefetchData = await prefetchData.orderBy("time");
  }

  let fetchData: any = {};
  if (limit) {
    fetchData = await prefetchData.limit(limit).onSnapshot(onSnapshotCB);
  } else {
    fetchData = await prefetchData.onSnapshot(onSnapshotCB);
  }

  return fetchData;
};

export const addFriendToUser = async (user: any, friend: any) => {
  try {
    const docRef = await firestoreDb.collection("users");
    //  1. update friends for user
    let friends = [...user.friends];
    let emails = friends.map((item: any) => item.email);
    if (!emails.includes(friend.email)) {
      friends.push(friend);
    }
    await docRef.doc(user.userId).update({ friends: friends });
    //  2. update friends for friend itself
    const newFriend = Object.assign({}, user);
    delete newFriend.friends;
    const friendUser = await findUser(friend.userId);
    emails = friendUser.friends.map((item: any) => item.email);
    if (!emails.includes(newFriend.email)) {
      friendUser.friends.push(newFriend);
    }

    await docRef.doc(friendUser.userId).update({ friends: friendUser.friends });
  } catch (error) {
    console.error("Error ", error);
  }
};

export const sendMessageBody = async (messageBody: any) => {
  const docRef = await firestoreDb
    .collection("messages")
    .doc(messageBody.messageId);
  await docRef.set(messageBody);
};
