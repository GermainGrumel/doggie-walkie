import React, { useState } from "react";
import { useHistory } from "react-router";
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
import { Link } from "react-router-dom";
import { toast } from "../../toast";
import { loginUser } from "../../firebaseConfig";
import { setUserState } from "../../redux/actions";
import { useDispatch } from "react-redux";
const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const history = useHistory();
  async function login() {
    setBusy(true);
    const res: any = await loginUser(username, password);
    if (!res) {
      toast("Error logging with your credentials");
    } else {
      dispatch(setUserState(res.user.email));
      history.replace("/tab1");
      toast("You have logged in!");
    }
    setBusy(false);
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
