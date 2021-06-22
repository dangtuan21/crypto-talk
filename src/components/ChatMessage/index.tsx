import React from 'react';
import {Text, View} from 'react-native';
import { Message } from "../../types";
import moment from "moment";
import styles from './styles';
import { getSignedInUser } from '../../util/util';

export type ChatMessageProps = {
  message: any;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;

  const isMyMessage = () => {
    const signedInUser = getSignedInUser();
    return message.sent_by === signedInUser.userId;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }
      ]}>
        {/* {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>} */}
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.time}>{moment(message.time).fromNow()}</Text>
      </View>
    </View>
  )
}

export default ChatMessage;
