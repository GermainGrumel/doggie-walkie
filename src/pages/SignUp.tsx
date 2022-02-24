import React, { useState } from "react";
import firebase from "firebase/compat/app";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { registerUser } from "../config/firebase";
const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");

  async function register() {
    if (password !== cpassword) {
      setColor("danger");
      setMessage("Les mots de passe ne correspondent pas");
      setShowToast(true);
    }
    if (username.trim() === "" || password.trim() === "") {
      setColor("danger");
      setMessage("Le mot de passe ne peut pas être vide");
      setShowToast(true);
    }
    const res = await registerUser(username, password);
    console.log("res :>> ", res);
    if (res) {
      setColor("danger");
      setMessage(`Bienvenue ${username}`);
      setShowToast(true);
      window.history.replaceState({}, "", "/home");
    }
  }

  return (
    <IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        position="middle"
        color={color}
        duration={5000}
        buttons={[
          {
            icon: "close",
            role: "Fermer",
            handler: () => {},
          },
        ]}
      />
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
          <IonLabel position="floating">Confirmez votre mot de passe</IonLabel>
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
            onClick={register}
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
  );
};

export default SignUp;
