import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { loginUser } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { toast } from "../toast";
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  async function login() {
    const res = await loginUser(username, password);
    if (!res) {
      toast("Error logging with your credentials");
    } else {
      toast("You have logged in!");
    }
  }

  console.log("password", password);
  console.log("text", username);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connectez vous</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nom d'utilisateur</IonLabel>
            <IonInput
              required
              placeholder="Entrez le nom de votre chien"
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
              placeholder="Entrez le nom de votre chien"
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
              value={password}
            ></IonInput>
          </IonItem>
          <IonButton onClick={login} className="ion-margin-top" type="submit">
            Login
          </IonButton>
          <IonText>
            Pas de compte ? <Link to="/register-user">Créer un compte</Link>
          </IonText>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
