import { View, Text, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from '../firebase'

const LogInscreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const signin = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
    }
    return (
        <KeyboardAvoidingView View style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
                style={{ width: 200, height: 200 }}></Image>
            {/* <Text>{email}</Text> */}
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Enter Email'
                    type="email"
                    autoFocus
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type="password"
                    autoFocus
                    value={password}
                    onChangeText={(text) => setPassword(text)} />
            </View>
            <Button containerStyle={styles.button}
                title="Login"
                onPress={signin}
            ></Button>
            <Button containerStyle={styles.button} title="Register"
                type='outline'
                onPress={() => navigation.navigate("Register")}
            ></Button>
            <View style={{ height: 150 }}></View>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});

export default LogInscreen