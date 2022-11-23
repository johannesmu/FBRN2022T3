import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

// const Tab = createBottomTabNavigator()

export function HomeScreen( props ) {
    const navigation = useNavigation()

    const pressHandler = () => {
        navigation.navigate("Register")
    }

    useEffect(() => {
        // if the user is not signed in
        if(!props.authStatus) {
            navigation.reset( {index: 0, routes: [ {name: "Login"} ] })
        }
    }, [props.authStatus])

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