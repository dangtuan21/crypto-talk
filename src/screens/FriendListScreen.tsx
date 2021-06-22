import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Text} from 'react-native';
import { View } from '../components/Themed';
import FriendItem from '../components/FriendItem';

// import chatRooms from '../data/ChatRooms';
import NewMessageButton from "../components/NewMessageButton";
import { getSignedInUser } from "../util/util";

export default function FriendListScreen() {
  const signedInUser = getSignedInUser();
  const friends = signedInUser.friends;

  if (friends.length === 0) { 
    return (
    <View style={styles.container}>
      <Text>No friends!</Text>
    </View>

    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
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
    alignItems: 'center',
    justifyContent: 'center',
  },

});
