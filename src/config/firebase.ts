import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
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
export const auth: any = getAuth();
console.log("AUTH FROM FIREBASE CONFIG", auth);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
      window.location.replace("/page/Login");
    })
    .catch((error) => {
      console.log("error", error);
    });
}
export async function loginUser(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("res", res);
    return res;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
}

export async function registerUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateUserProfile(username);
    return true;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
}

export async function updateUserProfile(username: string) {
  try {
    console.log("auth", auth);
    const response = await updateProfile(auth.currentUser, {
      displayName: username,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    });
    console.log("response", response);
    return true;
  } catch (error: any) {
    console.log("error", error);
    return false;
  }
}
