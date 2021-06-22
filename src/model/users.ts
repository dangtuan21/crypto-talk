
export const createUser = (username: string, email: string, password: string, authId: string, userId: string): any => {
  const signedUpUser: any = {
      authId,
      username,
      email,
      passcode: "0000",
      avatar:
        "https://images.pexels.com/photos/5968120/pexels-photo-5968120.jpeg",
      last_seen: "0",
      friends: [],
      userId,
    };  
  return signedUpUser;
};

  