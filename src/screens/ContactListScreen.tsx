import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Text} from 'react-native';
import { View } from '../components/Themed';
import ContactItem from "../components/ContactItem";
import { fetchNotFriendContacts, findUser } from "../api/DbServices";
import { getSignedInUser, messageService, setSignedInUser } from "../util/util";

export default function ContactListScreen() {
  const [showLoading, setShowLoading] = useState(false);
  let [subscription, setSubscription]: [any, any] = useState(undefined);
  let [contacts, setContacts]: [any[], any] = useState([]);

  //  DidMount
  useEffect(() => {
    setShowLoading(true);
    const getContacts = async (signedInUser: any) => {
      contacts = await fetchNotFriendContacts(signedInUser);
      setContacts(contacts);
      setShowLoading(false);
    };

    let signedInUser = getSignedInUser();

    getContacts(signedInUser);

    // subscribe to home component messages
    const subs = messageService.getMessage().subscribe(async (message) => {
      if (message) {
        signedInUser = await findUser(signedInUser.userId);
        setSignedInUser(signedInUser);

        getContacts(signedInUser);
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
        style={{width: '100%'}}
        data={contacts}
        renderItem={({ item }: any) => <ContactItem contact={item} />}
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
