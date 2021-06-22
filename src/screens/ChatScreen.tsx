import React, { useContext, useEffect, useRef, useState } from "react";
import {FlatList, ImageBackground, StyleSheet, Text} from 'react-native';
import { View } from '../components/Themed';

import { fetchMessages, sendMessageBody } from "../api/DbServices";
// import { sendSharp, happyOutline, linkOutline } from "ionicons/icons";

import ChatMessage from "../components/ChatMessage";

// import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { getSignedInUser, isAuthenticated } from "../util/util";
import BG from '../assets/images/BG.png';
import InputBox from "../components/InputBox";
import { useNavigation } from "@react-navigation/native";

export type ChatScreenProps = {
  friend: any;
}

const ChatScreen = (props: ChatScreenProps) => {
  const friend = props.route?.params?.friend;
  const signedInUser = getSignedInUser();
  let [messages, setChatMessages]: [any[], any] = useState([]);
  let snapshotSubscription: any = useRef(null);
  const navigation = useNavigation();

  const onSnapshotCB = (querySnapshot: any) => {
    const _messages: any[] = [];
    querySnapshot.forEach(function (doc: any) {
      _messages.push(doc.data());
    });
    setChatMessages(_messages);
  };

  const refreshChatSession = async () => {
    let channel1 = `${signedInUser.userId},${friend?.userId}`;
    let channel2 = `${friend?.userId},${signedInUser.userId}`;
    return await fetchMessages({ channel1, channel2, onSnapshotCB });
  };

  //  DidMount
  useEffect(() => {
    console.log('ChatScreen DidMount')
    refreshChatSession();
  }, []);

  //  WillUnMount
  useEffect(() => {
    return  () => {
      (async () => {
        snapshotSubscription.current = await refreshChatSession();
      }) ();
      console.log("messageSubscription unscribed");
    };
  }, []);   


  // const getImage = async () => {
  //   const image: Photo = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //   });

  //   await sendMessage("media", image.base64String);
  // };

  const isAuth = isAuthenticated();
  if (!isAuth) {
    navigation.navigate('ChatScreen', {
      friend
    })
  }

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        inverted
      />

      <InputBox sender={signedInUser} receiver={friend} />
    </ImageBackground>

  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
