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
  IonIcon,
  IonSearchbar,
  IonImg,
} from "@ionic/react";
import { child, get, getDatabase, ref } from "firebase/database";
import { useStore } from "react-redux";
import { useParams } from "react-router";
import "../styles/WalkMyDog.scss";
import { heartOutline, optionsOutline } from "ionicons/icons";
function RegisterDog() {
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  const db = getDatabase();
  const dbRef = ref(db);
  const [chosenDog, setChosenDog] = React.useState("");
  const [dogsFromDb, setDogsFromDb] = React.useState([]);
  const [heartColor, setHeartColor] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(true);

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

  const dogAvatars = [
    { url: "assets/images/dog1.jpeg" },
    { url: "assets/images/dog2.jpeg" },
    { url: "assets/images/dog3.jpeg" },
    { url: "assets/images/dog4.jpeg" },
    { url: "assets/images/dog5.jpeg" },
    { url: "assets/images/dog6.jpeg" },
    { url: "assets/images/dog7.jpeg" },
  ];

  useEffect(() => {
    fetchDogData();
  }, []);

  let welcomeMsg = (
    <IonCol class="slider ion-text-center">
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol size="9">
          <IonSearchbar
            color="light"
            placeholder="Rechercher"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            animated
          ></IonSearchbar>
        </IonCol>
        <IonCol size="3">
          <IonIcon icon={optionsOutline} color="primary" />
        </IonCol>
      </IonRow>
    </IonCol>
  );

  return (
    <IonContent>
      <IonGrid className="walkSomeoneDog">
        <IonRow>{welcomeMsg}</IonRow>
        <IonRow>
          <IonCol size="12" className="avatar-overflow">
            {dogAvatars.map((dog) => {
              return (
                <IonAvatar className="ion-align-items-center ion-justify-content-center">
                  <IonImg src={dog.url} />
                </IonAvatar>
              );
            })}
          </IonCol>
        </IonRow>
        <IonRow>
          {dogsFromDb.map((dog: any) => (
            <IonCol size="12" key={dog.id}>
              <IonRouterLink
                color="light"
                onClick={() => setChosenDog(dog)}
                href={`page/WalkSomeoneDogConfirm/${dog.id}`}
              >
                <IonCard>
                  <IonImg
                    src={`https://firebasestorage.googleapis.com/v0/b/dogwalkdev.appspot.com/o/dogs%2F${dog.profile_picture}?alt=media&token=3a344a22-004d-472b-8f7b-813e40c8d7af`}
                    alt="dog profile"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "250px",
                    }}
                  />
                  <IonCardHeader>
                    <div>
                      <IonCardTitle class="text-lg">
                        {dog.dogName} <br />
                      </IonCardTitle>
                      <IonCardContent className="ion-no-padding ion-margin-top text-md">
                        {dog.breed} de ,{" "}
                        {dog.age > 1 ? `${dog.age} ans` : `${dog.age} an`}{" "}
                        appartenant à{" "}
                        <IonText color="primary">
                          {" "}
                          <a href="/page/UserProfile">{dog.owner}</a>
                        </IonText>
                      </IonCardContent>
                      <IonRow className="ion-margin-top ion-justify-content-between ion-align-items-center">
                        <IonCardSubtitle>6km </IonCardSubtitle>
                        <IonIcon
                          icon={heartOutline}
                          color={heartColor ? "danger" : "dark"}
                          onClick={() => setHeartColor(true)}
                        />
                      </IonRow>
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
