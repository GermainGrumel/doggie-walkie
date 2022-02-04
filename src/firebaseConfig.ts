import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
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
console.log(`firebaseConfig`, app)
console.log(`firebaseConfig`, firebase.auth().currentUser)

export function getCurrentUser() {
    return new Promise((resolve, reject)=>{
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            resolve(user)
            console.log('user', user);
        } else {
            resolve(null)
            }
            unsubscribe()
        
    })
})
}
export async function logoutUser() {
    firebase.auth().signOut()
    console.log("Logging out...")
    return firebase.auth().signOut()
}
export async function loginUser(username: string, password: string) {
    const email = `${username}` // vérifier mail
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('res', res);
        return res
    } catch (error:any) {
        toast(error.message, 4000)
        return false
    }
}

// export async function registerUser(username: string, password: string) {
//     const email =  username// ici vérifier que la string respecte bien le mail firebase?.auth()?.currentUser?.email
//     // const pseudo = username //on affiche le username
//     try {
//         const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
//         console.log("res",res)
//         return true

//     } catch (error:any) {
//         console.log("ERROR", error)
//         toast(error.message, 4000)
//         return false
//     }
// }



export function userAvailabilityStatus() {
    return new Promise((resolve, reject)=>{
        firebase.auth().onAuthStateChanged(function (user: any) {
        let dispatch = useDispatch()
        if (user) {
            user["isAvailable"] = false;
            dispatch(setUserState(user.isAvailable));
            console.log('CLAC', user);
            resolve(user)
        } else {
            resolve(null)
            }
    })
})
}