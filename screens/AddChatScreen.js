import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [chat, setChat] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add New Chat",
            headerBackTitle: "Back To Chats",
        })
    }, [])
    const createChat= async ()=>{
        await db.collection("chats").add({
            chatName:chat,
        }).then(()=>{
            navigation.goBack();
        })
        .catch((error)=>alert(error))
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter Chat Name'
                value={chat}
                onChangeText={(text) => setChat(text)}
                leftIcon={
                    <Icon name='wechat' type='antdesign' size={24} color="black"/>
                }
            />
            <Button 
            onPress={createChat}
            onSubmitEditing={createChat}
            title="Create New Chat"
            />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },
})