import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();

  let welcomeMsg = (
    <IonCol class="slider ion-text-center">
      <IonImg className="logo" src="assets/tmp/logo-only.svg" />
      <IonText class="title-formaceo ion-text-uppercase" color="primary">
        DogWalker
      </IonText>
      <IonRow class="ion-justify-content-center">
        <IonCol size="auto">
          <IonImg class="waving-hand" src="assets/tmp/waving_hand.svg" />
        </IonCol>
        <IonCol size="auto">
          <IonText class="text-welcome">Content de te revoir {name} !</IonText>
        </IonCol>
      </IonRow>
    </IonCol>
  );

  return (
    <IonContent class="page-home">
      <IonRow>{welcomeMsg}</IonRow>

      <IonGrid>
        <IonRow class="ion-align-items-center">
          <IonCol>
            <IonText>a</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default HomePage;
