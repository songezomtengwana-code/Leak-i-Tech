import * as firebase from "firebase/compat";
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
 

export const firebaseConfig = {
    apiKey: "AIzaSyC5NtKImvRQ7FUDkNV80CaSQQNxR_CGm5Q",
    authDomain: "sams-cc74b.firebaseapp.com",
    projectId: "sams-cc74b",
    storageBucket: "sams-cc74b.appspot.com",
    messagingSenderId: "745669493080",
    appId: "1:745669493080:web:09a57945c7dff0d280652d",
    measurementId: "G-5GQBMSN987"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore();

const firestoreDB = getFirestore(app)
const storageDB = getStorage(app)


export { auth, db, firebase, firestoreDB, storageDB };
