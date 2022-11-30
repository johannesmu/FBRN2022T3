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
// firestore
import {
  getFirestore, 
  doc, 
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query
} 
from "firebase/firestore"
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
const FBdb = getFirestore( FBapp )

const Stack = createNativeStackNavigator();

export default function App() {
  // state to track user's authentication status
  const [auth,setAuth] = useState()
  // state to keep track of data from Firebase
  const [ data, setData ] = useState([])
  // state to control data fetching
  const [ startup, setStartup ] = useState(false)
  // get data on startup
  useEffect(() => {
    if( startup === false && auth ) {
      getListData()
      setStartup( true )
    }
  }, [startup, auth])

  // firebase observer for user's authentication status
  onAuthStateChanged( FBauth, (user) => {
    if( user ) {
      // user is signed in
      setAuth( user )
      console.log( user.uid )
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

  // function to add to user list
  const addToList = async (data) => {
    const path = "users/"  + "/list"
    const docRef = await addDoc( collection(FBdb, path ), data )
  }

  const getListData = () => {
    if( !auth) {
      return
    }
    // define collection
    const path = "users/" + auth.uid + "/list"
    const q = query( collection(FBdb, path ) )
    const unsubscribe = onSnapshot( q, (querySnapshot) => {
      let listData = []
      querySnapshot.forEach( (doc) => {
        let item = doc.data()
        item.id = doc.id
        listData.push( item )
      })
      setData( listData )
    })
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
          { (props) => <HomeScreen {...props} authStatus={auth} add={addToList} list={ data } />}
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
