import React, { useEffect } from "react";
import {
  IonGrid,
  IonText,
  IonContent,
  IonRow,
  IonCol,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonRouterLink,
  IonAvatar,
} from "@ionic/react";
import { child, get, getDatabase, ref } from "firebase/database";
import { useStore } from "react-redux";
import { useParams } from "react-router";

function RegisterDog() {
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

  return (
    <IonContent>
      <IonGrid>
        <IonRow class="ion-justify-content-center">
          <IonCol>
            <IonTitle>Vous souhaitez promener le chien de quelqu'un ?</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center">
          <IonCol>
            <IonText class="text-lg">À proximité de vous : </IonText>
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

        <IonRow class="ion-justify-content-center">
          <IonButton color="primary">Voir plus</IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
export default RegisterDog;
