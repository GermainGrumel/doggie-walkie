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
import { getStorage, uploadBytes, ref as sRef } from "firebase/storage";
import "../styles/HomePage.scss";
import { pawOutline, arrowForwardOutline, starOutline } from "ionicons/icons";
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
  const [showLoading, setShowLoading] = React.useState(true);

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

  console.log("usersFromDB :>> ", usersFromDb);
  let welcomeMsg = (
    <IonCol
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(22,56,63,1) 39%, rgba(121,68,9,1) 76%)",
      }}
      class="slider ion-text-center"
    >
      {/* <IonImg className="logo" src="assets/tmp/logo-only.svg" /> */}
      <IonRow>
        <IonCol
          style={{ display: "flex" }}
          class="ion-justify-content-center ion-align-items-center"
        >
          <IonText
            style={{ fontSize: "24px" }}
            class="ion-text-uppercase"
            color="primary"
          >
            DogWalker
          </IonText>
          <IonImg
            style={{ width: "100px" }}
            src="assets/images/dog-waving.png"
          />
        </IonCol>
      </IonRow>

      <IonCol size="auto"></IonCol>

      <IonCol size="auto">
        <IonText style={{ color: "white" }} class="text-welcome">
          Content de te revoir
          {" " + usersFromDb[0]?.username} !
        </IonText>
      </IonCol>
      <IonSearchbar
        color="light"
        placeholder="Rechercher"
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
        animated
      ></IonSearchbar>
    </IonCol>
  );
  console.log(chosenDog);

  return (
    <IonContent class="page-home">
      {usersFromDb[0] ? (
        <>
          {" "}
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

            <IonRow class="ion-padding-top ionic-padding-bottom">
              <IonButton href="/page/WalkMyDog">
                Faire promener mon chien
              </IonButton>
              <IonButton href="/page/WalkSomeoneDog">
                Promener le chien de quelqu'un
              </IonButton>
            </IonRow>

            <IonRow class="ion-justify-content-center">
              <IonCol size="auto">
                <IonTitle>Trouver un chien à proximité</IonTitle>
              </IonCol>
            </IonRow>

            <IonRow class="ion-align-items-center title-details">
              <IonCol
                style={{ display: "flex" }}
                className="ion-align-items-center ion-justify-content-around ion-text-center"
              >
                <div>
                  <IonIcon icon={pawOutline} className="paw-icon"></IonIcon>
                  <span className="text-custom ion-justify-items-center">
                    {dogsFromDb.length} chiens disponibles
                  </span>
                </div>
                <div>
                  <a href="/page/WalkSomeoneDog">
                    <IonText class="text-custom" color="primary">
                      Voir plus
                    </IonText>
                    <IonIcon
                      icon={arrowForwardOutline}
                      color="primary"
                      style={{ verticalAlign: "middle", marginLeft: "5px" }}
                    ></IonIcon>
                  </a>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="items-overflow">
                {dogsFromDb.map((dog: any) => (
                  <IonCard
                    href={`page/WalkSomeoneDogConfirm/${dog.id}`}
                    key={dog.id}
                    onClick={() => setChosenDog(dog)}
                    class="ion-align-items-center ion-text-center"
                  >
                    <IonImg
                      style={{ objectFit: "cover", height: "100px" }}
                      src={`https://firebasestorage.googleapis.com/v0/b/dogwalkdev.appspot.com/o/dogs%2F${dog.profile_picture}?alt=media&token=3a344a22-004d-472b-8f7b-813e40c8d7af`}
                    />
                    <IonCardHeader>
                      <IonCardSubtitle>
                        {dog.dogName} :{" "}
                        {dog.age > 1 ? `${dog.age} ans` : `${dog.age} an`}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                ))}
              </IonCol>
            </IonRow>

            <IonRow class="ion-align-items-center ion-padding-top">
              <IonCol style={{ marginLeft: "25px" }}>
                <div>
                  <IonIcon icon={starOutline} className="paw-icon"></IonIcon>
                  <span className="text-custom">
                    Mes 5 dernières promenades
                  </span>
                </div>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="items-aligned">
                {dogsFromDb.map((dog: any) => (
                  <>
                    <IonCard className="last-walks">
                      <IonAvatar>
                        <IonImg
                          src={`https://firebasestorage.googleapis.com/v0/b/dogwalkdev.appspot.com/o/dogs%2F${dog.profile_picture}?alt=media&token=3a344a22-004d-472b-8f7b-813e40c8d7af`}
                        ></IonImg>
                      </IonAvatar>
                      <div className="name-and-age">
                        <IonText>
                          {dog.dogName} : {""}
                          {dog.age > 1 ? `${dog.age} ans` : `${dog.age} an`}
                        </IonText>
                        <br />
                        <IonText>12 minutes</IonText>
                      </div>
                      <IonText color="primary">
                        {dog.creation_date} <br />
                        <span className="ion-text-end">
                          <b>12€</b>
                        </span>
                      </IonText>
                    </IonCard>
                  </>
                ))}
              </IonCol>
            </IonRow>
          </IonGrid>{" "}
        </>
      ) : (
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Chargement en cours..."}
          duration={5000}
        />
      )}
    </IonContent>
  );
};
export default HomePage;
