import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react'

export function LoginScreen( props ) {
    const [ email, setEmail ] = useState('')
    const [ validEmail, setValidEmail ] = useState(false)
    const [password,setPassword] = useState('')
    const [validPass, setValidPass] = useState( false )

    const navigation = useNavigation()

    const gotoRegister = () => {
        navigation.navigate("Register")
    }

    const signInUser = ( email, password ) => {
        props.handler( email, password )
    }

    useEffect(() => {
        if( email.length > 5 ) {
            setValidEmail( true )
        }
        else {
            setValidEmail( false )
        }
    },[email])

    useEffect(() => {
        if( password.length >= 6 ) {
            setValidPass( true )
        }
        else {
            setValidPass( false )
        }
    }, [password] )

    useEffect( () => {
        if( props.authStatus ) {
            navigation.reset( {index: 0, routes: [ {name: "Home"} ] })
        }
    }, [props.authStatus] )

    return(
        <View style={ styles.homeScreen }>
            <View style={styles.form}>
                <Text style={styles.title}>Sign in</Text>
                <Text>Email</Text>
                <TextInput 
                    style={styles.input} 
                    value={ email }
                    onChangeText = { (val) => setEmail(val) }
                />
                <Text>Password</Text>
                <TextInput  
                    style={styles.input} 
                    secureTextEntry={true} 
                    value={ password }
                    onChangeText = { (val) => setPassword(val) }
                />
                <TouchableOpacity 
                    style={ ( validEmail && validPass ) ? styles.button : styles.buttonDisable }
                    onPress={ () => signInUser(email, password) }
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerLink} onPress={ () => gotoRegister() }>
                    <Text style={styles.registerLinkText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: "lightyellow",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    form: {
        backgroundColor: "white",
        padding: 10,
        marginTop: 30,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        borderStyle: "solid",
        borderColor: "#cccccc",
        borderWidth: 1,
        padding: 5,
        marginVertical: 10,
    },
    button: {
        padding: 5,
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    buttonDisable: {
        padding: 5,
        backgroundColor: "#CCCCCC",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    registerLink: {
        marginVertical: 20,
    },
    registerLinkText: {
        textAlign: "center",
    },
})