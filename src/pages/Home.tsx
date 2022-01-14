import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
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
      <IonContent className="ion-align-items-center ion-justify-content-center">
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            className="ion-align-items-center ion-justify-content-center"
            size="12"
          >
            <IonText>Hello {username}</IonText>
          </IonCol>
        </IonRow>

        {/* CARD 1 */}
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            className="ion-align-items-center ion-justify-content-center"
            size="6"
          >
            <IonCard>
              <IonCardHeader color="primary">I have a dog</IonCardHeader>
              <IonCardContent>
                Doggy Walky is a service that allows you to register your dog so
                people can walk it when you're too busy.
              </IonCardContent>
              <IonButton href="/register-dog">Register my dog</IonButton>
            </IonCard>
          </IonCol>

          {/* CARD 2 */}
          <IonCol
            className="ion-align-items-center ion-justify-content-center"
            size="6"
          >
            <IonCard>
              <IonCardHeader color="primary">I don't have a dog</IonCardHeader>
              <IonCardContent>
                Doggy Walky is a service that allows you to walk other people
                dogs and earn money for it.
              </IonCardContent>
              <IonButton href="/walk-dog">Walk a dog</IonButton>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            className="ion-align-items-center ion-justify-content-center"
            size="6"
          >
            <IonImg src="/assets/img/registerDogs.png" />
          </IonCol>
        </IonRow>
        <IonLoading message="Logging out..." duration={0} isOpen={busy} />
        <IonButton onClick={logout}> Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
