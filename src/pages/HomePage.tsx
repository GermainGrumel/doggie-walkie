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
  IonToast,
  IonImg,
  IonIcon,
  IonLoading,
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useStore } from "react-redux";
import { child, get, getDatabase, ref } from "firebase/database";
import "../styles/HomePage.scss";
import { pawOutline } from "ionicons/icons";
const HomePage: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  const db = getDatabase();
  const dbRef = ref(db);
  const [chosenDog, setChosenDog] = React.useState("");
  const [dogsFromDb, setDogsFromDb] = React.useState([]);
  const [usersFromDb, setUsersFromDb] = React.useState<any[]>([]);
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState("");

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

  const fetchUserData = () => {
    get(child(dbRef, `users`))
      .then((res: any) => {
        let usersFromDB: any;
        if (res.exists()) {
          usersFromDB = Object.values(res.val());
          setUsersFromDb(usersFromDB);
          console.log("usersFromDB :>> ", usersFromDB);
        } else {
          console.log("No data available");
        }
        return usersFromDB;
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDogData();
    fetchUserData();
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
            {" " + usersFromDb[0]?.username} !
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
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          position="top"
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
        <IonSearchbar
          placeholder="Rechercher"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          animated
        ></IonSearchbar>
        <IonRow class="ion-justify-content-center">
          <IonCol size="auto">
            <IonButton href="/page/WalkMyDog">
              Faire promener mon chien
            </IonButton>
            <IonButton href="/page/WalkSomeoneDog">
              Promener le chien de quelqu'un
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow class="ion-justify-content-center">
          <IonCol size="auto">
            <IonTitle>Trouver un chien à proximité</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow class="ion-align-items-center title-details">
          <IonCol className="ion-align-items-center ion-text-center">
            <IonIcon icon={pawOutline} className="paw-icon"></IonIcon>
            <span className="text-custom ion-justify-items-center">
              {dogsFromDb.length} chiens disponibles
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="items-overflow">
            {dogsFromDb.map((dog: any) => (
              <IonCard
                href={`page/WalkSomeoneDogConfirm/${dog.id}`}
                key={dog.id}
                onClick={() => setChosenDog(dog)}
              >
                <IonImg src={dog.profile_picture} />
                <IonCardHeader>
                  <IonCardSubtitle>
                    {dog.dogName} : {dog.age} an
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            ))}{" "}
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol className="ion-align-items-center ion-text-center">
            <IonButton href="/page/WalkSomeoneDog">
              Voir tous les chiens
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center ion-text-center ion-padding-top">
          <IonCol>
            <IonTitle>Tu n'as pas encore inscris ton chien ?</IonTitle>
          </IonCol>
          <IonCol size="8">
            <IonText class="ion-padding">
              Rejoins la communauté de DogWalker et fais en sorte que ton
              compagnon canin puisse être promené aussi longtemps et autant de
              fois que nécessaire !{" "}
            </IonText>
          </IonCol>
          <IonCol size="4">
            <IonRow class="ion-padding">
              {" "}
              <IonAvatar>
                <IonImg src="https://img2.10bestmedia.com/Images/Photos/379272/GettyImages-104489865_54_990x660.jpg" />
              </IonAvatar>
              <IonAvatar>
                <IonImg src="https://img2.10bestmedia.com/Images/Photos/379272/GettyImages-104489865_54_990x660.jpg" />
              </IonAvatar>
              <IonAvatar>
                <IonImg src="https://img2.10bestmedia.com/Images/Photos/379272/GettyImages-104489865_54_990x660.jpg" />
              </IonAvatar>
              <IonAvatar>
                <IonImg src="https://img2.10bestmedia.com/Images/Photos/379272/GettyImages-104489865_54_990x660.jpg" />
              </IonAvatar>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center ion-text-center ion-padding-top ion-justify-content-center">
          <IonCol class="ion-align-items-center ion-text-center">
            <IonButton href="/page/RegisterDog">Inscris ton chien !</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default HomePage;
