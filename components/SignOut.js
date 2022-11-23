import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
export function SignOut( props ){
    return (
        <TouchableOpacity style={styles.buttonImage } onPress={ () => props.handler() } >
            <Image style={styles.buttonImage} source={ require("../assets/sign-out-alt-solid.png") } />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonImage: {
        maxWidth: 20,
        maxHeight: 20,
    }
})