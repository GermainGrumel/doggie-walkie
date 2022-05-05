import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonAvatar,
  IonTitle,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useStore } from "react-redux";
import { child, get, getDatabase, ref } from "firebase/database";
import { fetchDogData } from "../realtimeDatabase/database";
const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  const db = getDatabase();
  const dbRef = ref(db);
  const [chosenDog, setChosenDog] = React.useState("");
  const [dogsFromDb, setDogsFromDb] = React.useState([]);

  const fetchDogData = () => {
    get(child(dbRef, `dogs`))
      .then((res: any) => {
        let dogsFromDB: any;
        if (res.exists()) {
          dogsFromDB = Object.values(res.val()) as never[];
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
            Content de te revoir
            {" " + "user.username"} !
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
            <IonItem href="/page/WalkMyDog" detail={true} lines="none">
              <IonButton>Faire promener mon chien</IonButton>
            </IonItem>
            <IonItem href="/page/WalkSomeoneDog" detail={true} lines="none">
              <IonButton>Promener le chien de quelqu'un</IonButton>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center">
          <IonCol size="auto">
            <IonTitle>Trouver un chien à proximité</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow>
          {dogsFromDb.map((dog: any) => (
            <IonCol size="6" key={dog.id}>
              <IonRouterLink
                color="light"
                onClick={() => setChosenDog(dog)}
                href={`page/WalkSomeoneDogConfirm/${dog.id}`}
              >
                <IonCard>
                  <IonCardHeader>
                    <IonAvatar>
                      <img src={dog.profile_picture} alt="dog profile" />
                    </IonAvatar>
                    <div>
                      <IonCardTitle style={{ fontSize: "20px" }}>
                        {dog.dogName}, {dog.age} an
                      </IonCardTitle>
                      <IonCardSubtitle>6km </IonCardSubtitle>
                    </div>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default HomePage;
