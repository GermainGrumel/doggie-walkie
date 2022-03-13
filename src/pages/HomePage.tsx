import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { useStore } from "react-redux";
const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  // const state = useStore().getState();
  const state = {
    email: "germaingrumel@outlook.fr",
    username: "GermainGrumel",
  };
  console.log("state", state);
  let welcomeMsg = (
    <IonCol class="slider ion-text-center">
      {/* <IonImg className="logo" src="assets/tmp/logo-only.svg" /> */}
      <IonText class="ion-text-uppercase" color="primary">
        DogWalker
      </IonText>
      <IonRow class="ion-justify-content-center">
        {/* <IonCol size="auto">
          <IonImg class="waving-hand" src="assets/tmp/waving_hand.svg" />
        </IonCol> */}
        <IonCol size="auto">
          <IonText class="text-welcome">
            Content de te revoir {state.username} !
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-center">
        <IonCol size="auto">
          <IonText>
            Tu veux faire promener ton chien ou en promener un ?
          </IonText>
        </IonCol>
      </IonRow>
    </IonCol>
  );

  return (
    <IonContent class="page-home">
      <IonRow>{welcomeMsg}</IonRow>

      <IonGrid>
        <IonRow class="ion-justify-content-center">
          <IonCol size="auto">
            <IonButton>Faire promener mon chien</IonButton>
            <IonButton>Promener le chien de quelqu'un</IonButton>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center">
          <IonCol size="auto">
            <IonText>Trouver un chien à proximité</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Dog Name</IonCardSubtitle>
                <IonCardTitle>6km</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="3">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Dog Name</IonCardSubtitle>
                <IonCardTitle>6km</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="3">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Dog Name</IonCardSubtitle>
                <IonCardTitle>6km</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="3">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Dog Name</IonCardSubtitle>
                <IonCardTitle>6km</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default HomePage;
