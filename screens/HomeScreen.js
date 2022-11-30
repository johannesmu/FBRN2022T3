import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {ListScreen} from './ListScreen'
import { AddScreen } from './AddScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export function HomeScreen( props ) {
    const [listData,setListData] = useState()

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

    useEffect( () => {
        setListData( props.list )
    }, [props.list])

    return (
        
            <Tab.Navigator>
                <Stack.Screen name="List">
                    { (props) => <ListScreen {...props} data={ listData } /> }
                </Stack.Screen>
                <Stack.Screen name="Add" component={AddScreen} add={ props.add } />
            </Tab.Navigator>
        
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        padding: 10,
    }
})