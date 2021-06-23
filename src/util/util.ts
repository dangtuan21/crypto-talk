import { Subject } from "rxjs";
import { v4 } from "uuid";
import { sendMessageBody } from "../api/DbServices";

export const isAuthenticated = () => {
  const tokenId = localStorage.getItem("tokenId");
  return tokenId !== "" && tokenId !== undefined;
};

export const setAuthenticated = (tokenId: string) => {
  localStorage.setItem("tokenId", tokenId);
};
export const setSignedInUser = (signedInUser: any) => {
  localStorage.setItem("signedInUser", JSON.stringify(signedInUser));
};
export const getSignedInUser: any = () => {
  const jsonStringData = localStorage.getItem("signedInUser");
  return jsonStringData ? JSON.parse(jsonStringData) : undefined;
};

export const setStorageObject = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getStorageObject = (key: string): any => {
  const objString = localStorage.getItem(key);
  return objString ? JSON.parse(objString) : {};
};

const subject = new Subject();

export const messageService = {
  sendMessage: (message: any) => subject.next({ message }),
  clearMessages: () => subject.next(null),
  getMessage: () => subject.asObservable(),
};

export const sendText = async (
  text: string = "text",
  senderId: string,
  receiverId: string
) => {
  const messageBody = {
    messageId: v4(),
    sent_by: senderId,
    channel: `${senderId},${receiverId}`,
    type: "text",
    message: text || "",
    file_url: "",
    time: +Date.now(),
  };
  console.log("ttt sendText ", messageBody);
  await sendMessageBody(messageBody);
};

export const sendPicture = async (
  file: string,
  senderId: string,
  receiverId: string
) => {
  const messageBody = {
    messageId: v4(),
    sent_by: senderId,
    channel: `${senderId},${receiverId}`,
    type: "media",
    message: "",
    file_url: file,
    time: +Date.now(),
  };
  console.log("ttt sendPicture ", sendMessageBody);
  await sendMessageBody(messageBody);
};
