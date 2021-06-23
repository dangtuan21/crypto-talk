import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { sendMessageBody } from "../../api/DbServices";
import { useNavigation } from "@react-navigation/native";
import { sendText } from "../../util/util";

export type InputBoxProps = {
  sender: any;
  receiver: any;
};

const InputBox = (props: InputBoxProps) => {
  const sender = props.sender;
  const receiver = props.receiver;
  const [message, setMessage] = useState("");

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendText = async () => {
    console.warn(`Sending: ${message}`);

    // send the message to the backend
    await sendText(message, sender.userId, receiver.userId);
    //  empty the message box
    setMessage("");
  };

  const onSendTextOrVoice = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendText();
    }
  };

  const navigation = useNavigation();

  const onCameraClick = () => {
    navigation.navigate("CameraScreen", undefined);
  };

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
        {!message && (
          <Fontisto
            name="camera"
            size={24}
            color="grey"
            style={styles.icon}
            onPress={onCameraClick}
          />
        )}
      </View>
      <TouchableOpacity onPress={onSendTextOrVoice}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          ) : (
            <MaterialIcons name="send" size={28} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
