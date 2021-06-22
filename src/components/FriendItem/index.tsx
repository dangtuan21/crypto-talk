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

export type FriendItemProps = {
  friend: any;
}

const FriendItem = (props: FriendItemProps) => {
  const { friend } = props;

  const navigation = useNavigation();

  // const user = chatRoom.users[1];

  const onClick = () => {
    // navigation.navigate('ChatScreen', {
    //   id: chatRoom.id,
    //   name: user.name,
    // })
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
