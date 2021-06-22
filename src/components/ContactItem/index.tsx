import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import { getSignedInUser, messageService, setSignedInUser } from '../../util/util';
import { addFriendToUser } from '../../api/DbServices';

export type ContactItemProps = {
  contact: any;
}

const ContactItem = (props: ContactItemProps) => {
  const { contact } = props;

  const navigation = useNavigation();

  const onAddClick = async () => {
    const friend = Object.assign({}, contact);
    delete friend.friends;
    let signedInUser = getSignedInUser();
    await addFriendToUser(signedInUser, friend);

    setSignedInUser(signedInUser);
    messageService.sendMessage("AddFriendDone");
  };
  

  return (
    <TouchableWithoutFeedback >
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: contact.avatar }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            <Text style={styles.username}>{contact.username}</Text>
            {/* <Text numberOfLines={2} style={styles.lastMessage}>{contact.lastMessage.content}</Text> */}
          </View>

        </View>
        <Button
          title="Add"
          color="#f194ff"
          onPress={() => onAddClick()}
        />
        {/* <Text style={styles.time}>
          {moment(contact.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text> */}
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ContactItem;
