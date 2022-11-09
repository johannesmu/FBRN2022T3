import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function HomeScreen( props ) {
    const navigation = useNavigation()

    const pressHandler = () => {
        navigation.navigate("Register")
    }

    return (
        <View>
            <Text>Home </Text>
            <TouchableOpacity style={ styles.button } onPress={ () => pressHandler() }>
                <Text>Go to Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        padding: 10,
    }
})