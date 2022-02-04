import React, { useState } from "react";
import firebase from "firebase/compat/app";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { toast } from "../../toast";
// import { registerUser } from "../../firebaseConfig";
const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  async function createUser(userData: any) {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          userData.get("username"),
          userData.get("password")
        );
      console.log("userCrendential", userCredential);
      const userId = userCredential.user?.uid;
      console.log("userId", userId);
      await firebase
        .database()
        .ref("users/" + userId + "/")
        .set({
          fullName: userData.get("fullName"),
          phoneNumber: userData.get("phoneNumber"),
        });

      return userId; //As per your comment below
    } catch (error) {
      return error;
    }
  }
  // async function register() {
  //   if (password !== cpassword) {
  //     return toast("Password do not match");
  //   }
  //   if (username.trim() === "" || password.trim() === "") {
  //     return toast("Username and password required");
  //   }
  //   let userData = username + password;
  //   const res = await createUser(userData);
  //   console.log("userData :>> ", userData);
  //   if (res) {
  //     toast("You have registered successfully !");
  //     window.history.replaceState({}, "", "/home");
  //   }
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Créer un compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              required
              placeholder="Entrez votre email"
              onIonChange={(e) => setUsername(e.detail.value!)}
              clearInput
              value={username}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mot de passe</IonLabel>
            <IonInput
              type="password"
              required
              placeholder="Entrez un mot de passe"
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
              value={password}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Confirmez votre mot de passe
            </IonLabel>
            <IonInput
              type="password"
              required
              placeholder="Confirmez votre mot de passe "
              onIonChange={(e) => setCPassword(e.detail.value!)}
              clearInput
              value={cpassword}
            ></IonInput>
          </IonItem>
          <IonRow>
            <IonButton
              onClick={createUser}
              className="ion-margin-top"
              type="submit"
            >
              Créer un compte
            </IonButton>
          </IonRow>

          <IonText>
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </IonText>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisterUser;
