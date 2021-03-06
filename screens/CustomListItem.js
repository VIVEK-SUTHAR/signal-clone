import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe =
        db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp ', 'desc')
        .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    },[]);
    console.log(chatMessages);
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL || auth.currentUser.photoURL,
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({

})