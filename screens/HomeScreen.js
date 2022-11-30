import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'

import {Ionicons} from '@expo/vector-icons'

import {ListScreen} from './ListScreen'
import {AddScreen} from './AddScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

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
            <Tab.Navigator 
                initialRouteName='List'
                screenOptions={ ({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if( route.name == 'List') {
                            iconName = focused ? 'list-outline' : 'list-outline'
                        }
                        else if( route.name == 'Add') {
                            iconName = focused? 'add-outline' : 'add-outline'
                        }
                        else {
                            iconName = 'archive-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                }
                ) }
            >
                <Stack.Screen name="List" component={ListScreen} />
                <Stack.Screen name="Add" component={AddScreen} />
            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        padding: 10,
    }
})