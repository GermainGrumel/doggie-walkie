import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../styles/WalkMyDog.scss";
import "../styles/Account.scss";
import { child, get, getDatabase, ref, set, push } from "firebase/database";
import { format, utcToZonedTime } from "date-fns-tz";
import { useHistory } from "react-router";
import { fetchDogsData, fetchUsersData, findCurrentUser } from "../utils/utils";
import { useSelector } from "react-redux";

function WalkMyDog() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [hasDog, setHasDog] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [formattedDate, setFormattedDate] = useState<any>("");
  const [dogs, setDogs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userDogs, setUserDogs] = useState<any>();

  let date: string = new Date().toISOString();
  const db = getDatabase();
  const dbRef = ref(db);
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const state = useSelector((state: any) => state);

  const fetchDatasFromDatabase = async () => {
    const dogsFromDatabase: any = await fetchDogsData(dbRef);
    const usersFromDatabase: any = await fetchUsersData(dbRef);
    console.log("dogsFromDatabase :>> ", dogsFromDatabase);
    if (dogsFromDatabase !== [] && usersFromDatabase !== []) {
      setDogs(dogsFromDatabase);
      setUsers(usersFromDatabase);
    }
    const owner: any = dogs.find(
      (element: any) => element.owner_id === currentUser.id
    );
    setUserDogs(owner);
    console.log("owner :>> ", owner);
  };

  const getCurrentUser = async () => {
    const loggedUser = findCurrentUser(users, state);
    setCurrentUser(loggedUser);
  };

  console.log("currentUser", currentUser);

  console.log("userDogs", userDogs);
  const writeDogData = async () => {
    const dogData = {
      dogName: userDogs.dogName,
      gender: userDogs.gender,
      age: userDogs.age,
      breed: userDogs.breed,
      profile_picture: userDogs.profile_picture,
      owner_id: userDogs.owner_id,
      id: userDogs.id,
      available_at: formattedDate,
      description: "",
      creation_date: userDogs.creation_date,
    };
    try {
      set(ref(db, "dogs/" + userDogs?.id), dogData).then((res) => {
        console.log("res", res);
        history.push("/page/HomePage");
      });
    } catch (e) {
      console.log("ERROR FROM SIGN UP DOG", e);
    }
  };

  useEffect(() => {
    fetchDatasFromDatabase();
    getCurrentUser();
  }, [showLoading, selectedDate]);

  const formatDate = () => {
    if (selectedDate) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date(selectedDate);
      const zonedTime = utcToZonedTime(date, userTimeZone);
      const formatZonedTime = format(zonedTime, "dd-MM-yyyy à HH:mm", {
        timeZone: userTimeZone,
      });

      console.log("zorned", formatZonedTime);
      setFormattedDate(formatZonedTime);
    }
  };
  useEffect(() => {
    formatDate();
  }, [selectedDate]);
  return (
    <IonContent>
      {currentUser ? (
        hasDog ? (
          <>
            <IonGrid className="no-dog-container">
              <div className="background-container">
                <IonImg
                  className="background-cover"
                  src="assets/images/dogwalk.png"
                />
              </div>
              <div className="user-name ion-text-center ion-margin-top">
                <IonText className="text-xxl">
                  Bienvenue{" "}
                  <IonText color="primary">{currentUser.username}</IonText>
                </IonText>
              </div>

              <div className="ion-text-center ion-padding-top top-text">
                <IonText className="text-lg">
                  Tu veux faire promener ton chien ?
                </IonText>
              </div>
              <IonRow className="ion-align-self-center ion-justify-content-center ion-text-center">
                <IonCol>
                  <IonText className="text-xl">Choisis un horaire !</IonText>
                </IonCol>
              </IonRow>
              <IonRow
                style={{ marginLeft: "10px" }}
                className="ion-align-self-center ion-justify-content-center ion-text-center"
              >
                <IonCol>
                  <IonDatetime
                    min={date}
                    locale="fr-FR"
                    value={selectedDate}
                    onIonChange={(e) => setSelectedDate(e.detail.value!)}
                    presentation="time-date"
                    name="dateSetByUser"
                    minute-values="0,15,30,45"
                    first-day-of-week="1"
                  />
                </IonCol>
              </IonRow>
              {formattedDate ? (
                <IonRow class="ion-justify-content-center ion-text-center ion-padding">
                  <IonCol size="8">
                    <IonText>
                      Confirmer que{" "}
                      <IonText color="primary">{userDogs?.dogName}</IonText> est
                      disponible le
                      <br />
                      <b>{Object.values(formattedDate)} ?</b>
                    </IonText>
                    <IonButton onClick={writeDogData}>Confirmer</IonButton>
                  </IonCol>
                </IonRow>
              ) : null}
            </IonGrid>
          </>
        ) : (
          <IonGrid className="no-dog-container">
            <div className="background-container">
              <IonImg
                className="background-cover"
                src="assets/images/walkmydogbanner.jpg"
              />
            </div>
            <div className="user-name ion-text-center ion-margin-top">
              <IonText className="text-xxl">
                Bienvenue <IonText color="primary">Germain</IonText>
              </IonText>
            </div>

            <div className="ion-text-center ion-padding-top top-text">
              <IonText className="text-lg">
                Il semble que tu n'as pas ton compagnon canin à quatre pattes
                d'inscris, remédions à ça !
              </IonText>
            </div>

            <IonRow className="ion-align-self-center">
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle color="primary">
                      Inscris ton chien !
                    </IonCardTitle>
                    <IonItem
                      href="/page/RegisterDog"
                      detail={true}
                      lines="none"
                    >
                      <IonCardContent className="ion-padding-top">
                        Inscris ton chien pour que d'autres utilisateurs
                        puissent le promener quand tu le rend disponible !
                      </IonCardContent>
                    </IonItem>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>En savoir plus sur le concept</IonCardTitle>
                    <IonItem href="/page/Password" detail={true} lines="none">
                      <IonCardContent className="ion-padding-top">
                        Tu désires en savoir plus concernant Ilda ? Tu ne sais
                        pas ce qu'il se passera une fois ton chien inscris ? Pas
                        de problème nous pouvons répondres à tes questions !
                      </IonCardContent>
                    </IonItem>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )
      ) : (
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Chargement en cours..."}
          duration={3000}
        />
      )}
    </IonContent>
  );
}

export default WalkMyDog;
