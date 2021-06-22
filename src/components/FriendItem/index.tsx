import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import { getStorageObject } from '../../util/util';

export type FriendItemProps = {
  friend: any;
}

const FriendItem = (props: FriendItemProps) => {
  const { friend } = props;

  const navigation = useNavigation();
  const onClick = () => {
    const isEncryptedString: string | null = getStorageObject("IsEncrypted");
    const isEncrypted =
      isEncryptedString && isEncryptedString === "true" ? true : false;
    const url = isEncrypted ? "/enc-chat-page" : "/chat-page";

    navigation.navigate('ChatScreen', {
      friend
    })
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: friend.avatar }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            <Text style={styles.username}>{friend.username}</Text>
            {/* <Text numberOfLines={2} style={styles.lastMessage}>{friend.lastMessage.content}</Text> */}
          </View>

        </View>

        {/* <Text style={styles.time}>
          {moment(friend.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text> */}
      </View>
    </TouchableWithoutFeedback>
  )
};

export default FriendItem;
