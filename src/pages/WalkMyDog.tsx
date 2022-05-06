import { IonButton, IonContent, IonItem, IonText } from "@ionic/react";
import React from "react";

function WalkMyDog() {
  let userHasDog = false;
  return (
    <IonContent>
      {userHasDog ? (
        <IonText>Promenez dogame !</IonText>
      ) : (
        <IonItem href="/page/RegisterDog">
          <IonButton>Inscrivez votre chien !</IonButton>
        </IonItem>
      )}
    </IonContent>
  );
}

export default WalkMyDog;
