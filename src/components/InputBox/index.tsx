import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity,} from "react-native";
import styles from './styles';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import { sendMessageBody } from '../../api/DbServices';
import { v4 } from "uuid";

export type InputBoxProps = {
  sender: any,
  receiver: any;
}

const InputBox = (props: InputBoxProps) => {
  const sender = props.sender;
  const receiver = props.receiver;
  const [message, setMessage] = useState('');

  const onMicrophonePress = () => {
    console.warn('Microphone')
  }

  const onSendPress = async () => {
    console.warn(`Sending: ${message}`)

    // send the message to the backend
    await sendMessage('text', message);
    //  empty the message box
    setMessage('');
  }

  const sendMessage = async (
    type: string = "text",
    file: string | undefined
  ) => {
    if (message || type === "media") {
      let messageBody = {
        messageId: v4(),
        sent_by: sender.userId,
        channel: `${sender.userId},${receiver.userId}`,
        type: type,
        message: message || "",
        file_url: file,
        time: +Date.now(),
      };
      console.log('ttt sendMessageBody ', sendMessageBody);
      await sendMessageBody(messageBody);
    }
  };  

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
            : <MaterialIcons name="send" size={28} color="white" />}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default InputBox;
