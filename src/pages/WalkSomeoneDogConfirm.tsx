import React, { useEffect } from "react";
import {
  IonGrid,
  IonText,
  IonContent,
  IonRow,
  IonCol,
  IonTitle,
  IonButton,
  IonImg,
  IonBackButton,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useDispatch, useStore } from "react-redux";
import { useParams } from "react-router";
import { child, get, getDatabase, ref } from "firebase/database";

type Dog = {
  age: string;
  breed: string;
  creation_date: string;
  dogName: string;
  gender: string;
  id: string;
  owner: string;
  profile_picture: any;
};
function WalkSomeoneDogConfirm() {
  const { id } = useParams<{ id: string }>();
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  const db = getDatabase();
  const dbRef = ref(db);
  const dispatch = useDispatch();
  const [currentDog, setCurrentDog] = React.useState<Dog>();
  const [dogsFromDb, setDogsFromDb] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [showLoading, setShowLoading] = React.useState(true);

  const fetchDogData = async () => {
    try {
      const response = await get(child(dbRef, `dogs`));
      if (!response.exists()) return;
      const dogs: Dog[] = Object.values(response.val());
      const dog = dogs.find((element) => element.id === id);
      if (!dog) return;
      setCurrentDog(dog);
      // for (const dog of dogs) {
      //   if (dog.id !== id) continue;
      //   setCurrentDog(dog);
      //   break;
      // }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDogData();
  }, []);

  const attributeDog = () => {
    setColor("success");
    setMessage("Vous pouvez aller chercher dog.name dans 10 mins");
    setShowToast(true);
  };
  return (
    <IonContent>
      {currentDog ? (
        <IonGrid>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={message}
            position="middle"
            color={color}
            duration={5000}
            buttons={[
              {
                icon: "close",
                role: "Fermer",
                handler: () => {},
              },
            ]}
          />
          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol>
              <IonText>Vous souhaitez promener {currentDog.dogName}?</IonText>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol>
              <IonText class="text-md">
                dog name se situe à 6km de vous !
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol>
              <IonImg
                style={{ height: "200px" }}
                src={currentDog.profile_picture}
              />
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol>
              <IonText class="text-md">
                Vous pouvez aller chercher {currentDog.dogName} chez{" "}
                {currentDog.owner} à 14h15 !
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center ion-text-center">
            <IonCol>
              <IonButton
                onClick={attributeDog}
                color="primary"
                href="page/HomePage"
              >
                Valider l'action
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : (
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Chargement en cours..."}
        />
      )}
    </IonContent>
  );
}

export default WalkSomeoneDogConfirm;
