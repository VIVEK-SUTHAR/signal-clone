import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth, db } from "../firebase"
const RegisterScreen = ({ navigation }) => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageurl, setImageurl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back To Login",
        })
    }, [navigation])
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile ({
                displayName:fname,
                photoURL:imageurl || "https://www.wsy.dk/wp-content/uploads/2016/01/Avatar-placeholder.png",
            })
        })
        .catch((error)=>{alert(error.message)});    
    }
    return (

        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"></StatusBar>

            <Text h4 style={{ marginBottom: 50 }}>Create A Signal Account</Text>
            {/* <Text>{fname}{email}:{password}</Text>  */}
            <View style={styles.inputContainer}>
                <Input placeholder='Your Full Name' type='text' value={fname} onChangeText={(text) => setFname(text)} />
                <Input placeholder='Your Email ID' type='email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Your Password' type='password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder='Profile Picture Link(optional)' type='text' value={imageurl} onChangeText={(text) => setImageurl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                title="Register"
                onPress={register}
                containerStyle={styles.button}
            ></Button>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})