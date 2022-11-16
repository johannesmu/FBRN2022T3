import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// react
import { useState, useEffect } from 'react'
// firebase
import { firebaseConfig } from './config/Config';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged 
} 
from "firebase/auth";
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import { HomeScreen  } from './screens/HomeScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { LoginScreen } from './screens/LoginScreen';

const FBapp = initializeApp( firebaseConfig )
const FBauth = getAuth( FBapp )

const Stack = createNativeStackNavigator();

export default function App() {
  // state to track user's authentication status
  const [auth,setAuth] = useState()
  // firebase observer for user's authentication status
  onAuthStateChanged( FBauth, (user) => {
    if( user ) {
      // user is signed in
      setAuth( user )
    }
    else {
      setAuth( false )
    }
  })

  // function to sign up user
  const signUpHandler = ( email, password ) => {
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => console.log(userCredential) )
    .catch( (error) => console.log(error) )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Register">
          { (props) => <RegisterScreen {...props} handler={signUpHandler} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
