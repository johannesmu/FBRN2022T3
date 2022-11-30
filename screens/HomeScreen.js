import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'

import {ListScreen} from './ListScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
        
            <Tab.Navigator>
                <Stack.Screen name="List" component={ListScreen} />
            </Tab.Navigator>
        
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        padding: 10,
    }
})