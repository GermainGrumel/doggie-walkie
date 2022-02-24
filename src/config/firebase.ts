import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // databaseURL: "a",
};
initializeApp(firebaseConfig);

const auth = getAuth();

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    // firebase.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
        console.log("user", user);
      } else {
        reject(user);
      }
    });
  });
}
// export async function logoutUser() {
//   // firebase.auth().signOut()
//   console.log("Logging out...");
//   return signOut(getAuth());
// }
export async function loginUser(username: string, password: string) {
  const email = `${username}`; // vérifier mail
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("res", res);
    return res;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
}

export async function registerUser(username: string, password: string) {
  const email = username; // ici vérifier que la string respecte bien le mail firebase?.auth()?.currentUser?.email
  // const pseudo = username //on affiche le username
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("res", res);
    return true;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
}
