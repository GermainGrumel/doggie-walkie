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
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { toast } from "../../toast";
import { registerUser } from "../../firebaseConfig";
const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  async function register() {
    if (password !== cpassword) {
      return toast("Password do not match");
    }
    if (username.trim() === "" || password.trim() === "") {
      return toast("Username and password required");
    }
    const res = await registerUser(username, password);
    if (res) {
      toast("You have registered successfully !");
    }
  }

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
          <IonItem>
            <IonLabel position="floating">
              Confirmez votre mot de passe
            </IonLabel>
            <IonInput
              type="password"
              required
              placeholder="Confirmez mot de passe "
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
    </IonPage>
  );
};

export default RegisterUser;
