import {useState} from 'react';
import './App.css';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy,
  serverTimestamp,
  doc,
  setDoc
 } from 'firebase/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDPO0wM-y3QTNHPCj1IbkRS-dvDcinSr_c",
  authDomain: "chat-app-f8a6e.firebaseapp.com",
  projectId: "chat-app-f8a6e",
  storageBucket: "chat-app-f8a6e.appspot.com",
  messagingSenderId: "514039786914",
  appId: "1:514039786914:web:feaf2bf19bb8f3af6a56fb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

function App() {
  return (
    <div className="App">
      <header>
      
      </header>
      <section>
         <ChatRoom/>
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

// function SignOut() {
//   return auth.currentUser && (
//     <button onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }

function ChatRoom() {
  // reference a firestore collection.
  const messagesRef = collection(db, 'messages');
  // query documents in a collection.
  const q = query(messagesRef, orderBy('createdAt'));
  // listen to data with hook.
  const [messages] = useCollectionData(q, {idField: 'id'});
  const [formValue, setFormValue] = useState("")

  const sendMessage = async(e) => {
    e.preventDefault();

    // const {uid, photoURL} = auth.currentUser;

    await setDoc(doc(db, 'messages', Math.random().toString()), 
    {
      text: formValue,
      createdAt: serverTimestamp(),
    })
    setFormValue('');
  }
  return (
    <>
    <div>
      {messages && messages.map( msg => <ChatMessage message={msg}/>)}
    </div>
    <div>
      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit">🎃</button>
      </form>
    </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // const messageClass = uid === auth.currentUser.id ? 'sent' : 'recieved';


  return (
    <div>
      <img src={photoURL} alt=""/>
      <p>{text}</p>
    </div>
  )
}

export default App;
