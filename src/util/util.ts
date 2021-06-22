import { Subject } from "rxjs";

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

export const setStorageObject = (value: string, key: string) => {
  localStorage.setItem(key, value);
};
export const getStorageObject = (key: string): string | null => {
  return localStorage.getItem(key);
};

const subject = new Subject();

export const messageService = {
  sendMessage: (message: any) => subject.next({ message }),
  clearMessages: () => subject.next(null),
  getMessage: () => subject.asObservable(),
};
