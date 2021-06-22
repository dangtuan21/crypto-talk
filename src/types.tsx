export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Friends: undefined;
  Contacts: undefined;
  ChatRoom: undefined;
  ChatScreen: undefined;
};

export type MainTabParamList = {
  Friends: undefined;
  Contacts: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  status: String;
}

export type Message = {
  id: String;
  content: string;
  createdAt: string;
  user: User;
}

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
}
