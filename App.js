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
  signInWithEmailAndPassword,
  signOut,
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
// components
import { SignOut } from './components/SignOut'

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
      console.log( user )
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

  // function to sign in user
  const signInHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => console.log(userCredential) )
    .catch( (error) => console.log(error) )
  }

  // function to sign out user
  const signOutHandler = () => {
    signOut( FBauth )
    .then(() => console.log('signed out') )
    .catch((error) => console.log(error) )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Register">
          { (props) => <RegisterScreen {...props} handler={signUpHandler} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Login">
          { (props) => <LoginScreen {...props} handler={signInHandler} authStatus={auth} /> }
        </Stack.Screen>
        <Stack.Screen name="Home"  options={{
                           headerTitle:"Home",
                           headerShown: false,
                           headerRight: ( props ) => <SignOut {...props} handler={signOutHandler} />
                          }}>
          { (props) => <HomeScreen {...props} authStatus={auth} />}
        </Stack.Screen>
       
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
