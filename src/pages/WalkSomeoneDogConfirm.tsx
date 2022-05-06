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
  IonToast,
} from "@ionic/react";
import { useDispatch, useStore } from "react-redux";
import { useParams } from "react-router";
import { child, get, getDatabase, ref } from "firebase/database";
function WalkSomeoneDogConfirm() {
  const { id } = useParams<{ id: string }>();
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  const db = getDatabase();
  const dbRef = ref(db);
  const dispatch = useDispatch();
  const [chosenDog, setChosenDog] = React.useState("");
  const [dogsFromDb, setDogsFromDb] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");

  const fetchDogData = () => {
    get(child(dbRef, `dogs`))
      .then((res: any) => {
        let dogsFromDB: any;
        if (res.exists()) {
          dogsFromDB = Object.values(res.val()) as never[];
          dispatch({ type: "SET_USER", payload: dogsFromDB });
          setDogsFromDb(dogsFromDB);
          console.log("dogsFromDB :>> ", dogsFromDB);
        } else {
          console.log("No data available");
        }
        return dogsFromDB;
      })
      .catch((error: any) => {
        console.error(error);
      });
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
        <IonBackButton>a</IonBackButton>
        <IonRow class="ion-justify-content-center ion-text-center">
          <IonCol>
            <IonTitle>Vous souhaitez promener dog name ?</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center ion-text-center">
          <IonCol>
            <IonText class="text-md">dog name se situe à 6km de vous !</IonText>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center ion-text-center">
          <IonCol>
            <IonImg style={{ height: "200px" }} src="assets/images/dog.jpeg" />
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center ion-text-center">
          <IonCol>
            <IonText class="text-md">
              Vous pouvez aller chercher dog name chez owner name à
              timetSetByOwner !
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
    </IonContent>
  );
}

export default WalkSomeoneDogConfirm;
