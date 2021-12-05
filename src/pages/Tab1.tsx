import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";

const Tab1: React.FC = () => {
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
            <IonButton href="/RegisterDog">Register my dog</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
