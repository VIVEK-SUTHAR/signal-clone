import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons, FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import firebase from 'firebase/compat/app';
const Chat = ({ navigation, route }) => {
  const sendMessage = () => {
    setInput('');
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
  }

  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      // headerTitleAlign:"center",
      headerTitle: () => (
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
        }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL ||
                "https://randomuser.me/api/portraits/men/22.jpg"
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' size={24} color="white" ></AntDesign>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])


  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
      }
      )
    return unsubscribe;
  }, [route])
  const handleMsg = (text) => {
    setInput(text);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 15, }}>
          {messages.map(({ id, data }) => (
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.receiver}>
                <Avatar
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  rounded
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.receiverText}>{data.message}</Text>
              </View>
            ) :
              (
                <View style={styles.sender} key={id}>
                  <Avatar
                    position="absolute"
                    bottom={-15}
                    left={-5}
                    rounded
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            autoFocus
            placeholder='Signal Message'
            style={styles.textinput}
            value={input}
            onChangeText={handleMsg}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name='send' size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%", padding: 5,
    // borderColor:"red",
    // borderWidth:1,
  },
  textinput: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: 'relative',
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
})