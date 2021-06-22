import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signInApi } from "../api/DbServices";
import { setAuthenticated, setSignedInUser } from "../util/util";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../model/users";
import { v4 } from "uuid";

export default function LoginScreen() {
  const [email, setEmail] = useState("test1@mail.com");
  const [password, setPassword] = useState("111111");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setAuthenticated("");
  });

  const onLogin = async (e: any) => {
    console.log("Login ", email, password);
    e.preventDefault();

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      const { signedInUser, message } = await signInApi({ email, password });
      console.log("signedInUser 111 ", signedInUser);

      if (message) {
        console.log("Error", message);
        setShowToast(true);
        return;
      }

      setAuthenticated("tokenId");
      setSignedInUser(signedInUser);

      navigation.navigate("Talk");
    }
  };
  const onOneTimeLogin = async (e: any) => {
    e.preventDefault();

    setAuthenticated("tokenId");

    const userId = v4();
    const signedInUser = createUser(userId.substr(0, 7), '', '', userId, userId);

    setAuthenticated("tokenId");
    setSignedInUser(signedInUser);

    navigation.navigate("Talk");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Crypto Message</Text>
      <View style={styles.inputView}>
        <TextInput
          value={email}
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={password}
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={(e) => onLogin(e)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={(e) => onOneTimeLogin(e)}>
        <Text style={styles.loginText}>1-Time-Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontSize: 20,
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
