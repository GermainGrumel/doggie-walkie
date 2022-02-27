import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
console.log("auth", auth);
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in", user);
        resolve(user);
      } else {
        console.log("not logged in", user);
        resolve(null);
      }
    });
  });
}

export async function logoutUser() {
  return signOut(auth)
    .then(() => {
      console.log("Logging out...");
    })
    .catch((error) => {
      console.log("error", error);
    });
}
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
