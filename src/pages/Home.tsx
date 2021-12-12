import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router";

import { useState } from "react";

const Home: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const username = useSelector((state: any) => state.user.username);
  const history = useHistory();
  async function logout() {
    setBusy(true);
    await logoutUser();
    setBusy(false);
    history.replace("/register-user");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Walk my Doggy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-align-items-center ion-justify-content-center">
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            className="ion-align-items-center ion-justify-content-center"
            size="12"
          >
            <IonText>Hello {username}</IonText>
            <IonLoading message="Logging out..." duration={0} isOpen={busy} />
            <IonButton onClick={logout}> Logout</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
