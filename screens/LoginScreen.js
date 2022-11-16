import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export function LoginScreen( props ) {
    return(
        <View style={ styles.homeScreen }>
            <View style={styles.form}>
                <Text style={styles.title}>Sign in</Text>
                <Text>Email</Text>
                <TextInput style={styles.input} />
                <Text>Password</Text>
                <TextInput  style={styles.input} secureTextEntry={true} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign in</Text>
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
})