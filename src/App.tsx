import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebaseConfig";
import { IonButton, IonContent, IonInput, IonRow, IonTitle } from "@ionic/react";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser:any) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <IonContent className="App">
      <IonRow>
          <IonTitle> Register User </IonTitle>
          <IonInput
            placeholder="Email..."
            onChange={(event:any) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <IonInput
            placeholder="Password..."
            onChange={(event:any) => {
              setRegisterPassword(event.target.value);
            }}
          />
        <IonButton onClick={register}> Create User</IonButton>
      </IonRow>
    <IonContent className="App">
      <IonRow>
          <IonTitle> Login </IonTitle>
          <IonInput
            placeholder="Email..."
            onChange={(event:any) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <IonInput
            placeholder="Password..."
            onChange={(event:any) => {
              setLoginPassword(event.target.value);
            }}
          />
        <IonButton onClick={login}> Create User</IonButton>
      </IonRow>

      <IonTitle> User Logged In: </IonTitle>
      {user?.email}
        <IonButton onClick={logout}> Sign Out </IonButton>
        </IonContent>
  );
}

export default App;
