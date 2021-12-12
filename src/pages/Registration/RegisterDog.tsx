import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { toast } from "../../toast";
const RegisterDog: React.FC = () => {
  const [dogName, setDogName] = useState<string>();
  const [dogAge, setDogAge] = useState<number>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register your dog</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nom du chien</IonLabel>
            <IonInput
              required
              placeholder="Entrez le nom de votre chien"
              onIonChange={(e) => setDogName(e.detail.value!)}
              clearInput
              value={dogName}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              required
              type="number"
              value={dogAge}
              placeholder="Entrez l'âge de votre chien"
              onIonChange={(e) => setDogAge(parseInt(e.detail.value!, 10))}
            ></IonInput>
          </IonItem>
          <IonButton className="ion-margin-top" type="submit">
            Register my dog
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisterDog;