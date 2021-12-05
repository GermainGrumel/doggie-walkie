import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { toast } from './toast';
// https://stackoverflow.com/questions/69139443/property-auth-does-not-exist-on-type-typeof-import-firebase-auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvXNjihLIQkDpZHbBocgvkFB4dv_QgLUU",
  authDomain: "dogwalk-88954.firebaseapp.com",
  projectId: "dogwalk-88954",
  storageBucket: "dogwalk-88954.appspot.com",
  messagingSenderId: "89433557270",
  appId: "1:89433557270:web:4fb551701d6d2d9feae837"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export async function loginUser(username: string, password: string) {
    const email = `${username}@outlook.com`
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function registerUser(username: string, password: string) {
    const email = `${username}@outlook.com`
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(username, password)
        console.log(res)
        return true

    } catch (error:any) {
        console.log("ERROR", error)
        toast(error.message)
        return false
    }

}