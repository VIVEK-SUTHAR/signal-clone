import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from './CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from "../firebase"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
const Home = ({ navigation }) => {

    const [chats, setChats] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        return unsubscribe;
    }, [])


    const SignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (<View style={{ marginLeft: 20 }}>
                <TouchableOpacity activeOpacity={0.54} onPress={SignOut}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL ||
                                "https://randomuser.me/api/portraits/men/22.jpg",
                        }}
                    />
                </TouchableOpacity>
            </View>),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SimpleLineIcons name='pencil' size={24} color="black"
                            onPress={() => navigation.navigate("AddChat")}
                        />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style='auto' />
            <ScrollView style={styles.container}>
                {
                    chats.map(({ id, data: { chatName } }) =>
                        <CustomListItem key={id} id={id} chatName={chatName}
                            enterChat={enterChat}
                        />
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
})