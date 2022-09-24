import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDPO0wM-y3QTNHPCj1IbkRS-dvDcinSr_c",
  authDomain: "chat-app-f8a6e.firebaseapp.com",
  projectId: "chat-app-f8a6e",
  storageBucket: "chat-app-f8a6e.appspot.com",
  messagingSenderId: "514039786914",
  appId: "1:514039786914:web:feaf2bf19bb8f3af6a56fb" 
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header>
      
      </header>
      <section>
        { user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
