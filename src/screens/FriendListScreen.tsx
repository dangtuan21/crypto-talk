import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import FriendItem from "../components/FriendItem";

// import chatRooms from '../data/ChatRooms';
import NewMessageButton from "../components/NewMessageButton";
import { getSignedInUser, messageService } from "../util/util";

export default function FriendListScreen() {
  let [friends, setFriends]: [any[], any] = useState([]);
  let [subscription, setSubscription]: [any, any] = useState(undefined);

  //  DidMount
  useEffect(() => {
    const signedInUser = getSignedInUser();
    setFriends(signedInUser.friends);
    // subscribe to home component messages
    const subs = messageService
      .getMessage()
      .subscribe(async ({ message }: any) => {
        if (message === "AddFriendDone") {
          const _signedInUser = getSignedInUser();
          setFriends(_signedInUser.friends);
        }
      });

    setSubscription(subs);
  }, []);

  //  WillUnMount
  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={friends}
        renderItem={({ item }: any) => <FriendItem friend={item} />}
        keyExtractor={(item: any) => item.userId}
      />
      {/* <NewMessageButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
