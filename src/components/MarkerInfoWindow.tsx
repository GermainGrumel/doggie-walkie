import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonLoading,
  IonNote,
  IonRow,
  IonText,
} from "@ionic/react";
import { getDatabase, ref } from "firebase/database";
import {
  footstepsOutline,
  locationOutline,
  personOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {
  fetchDogsData,
  fetchUsersData,
  findCurrentUser,
  writeDogData,
  writeUserData,
} from "../utils/utils";
import { getAuth } from "firebase/auth";

interface Marker {
  latitude: number;
  longitude: number;
  username: string;
  hasDog: boolean;
  walkingDogId: string;
  creation_date: string;
  marker?: any;
  id: string;
}

interface selectedDog {
  age: string;
  available_at: string;
  breed: string;
  creation_date: string;
  description: string;
  dogName: string;
  gender: string;
  id: string;
  owner_id: string;
  profile_picture: string;
  taken: boolean;
}

export const MarkerInfoWindow: any = ({ marker }: Marker) => {
  const [showLoading, setShowLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState<selectedDog>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [users, setUsers] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db);
  const auth: any = getAuth();

  const getCurrentUser: any = async () => {
    let findUser = await findCurrentUser(users, auth.currentUser.email);
    setCurrentUser(findUser);
  };
  console.log("marker :>> ", marker);

  const getDogData = async () => {
    const dogsFromDatabase = await fetchDogsData(dbRef);
    const usersFromDatabase = await fetchUsersData(dbRef);
    setDogs(dogsFromDatabase);
    setUsers(usersFromDatabase);
    const currentDog: any = dogs.find(
      (element: any) => element.owner_id === marker.id.toString()
    );
    setSelectedDog(currentDog);
  };
  const setTakenDog = () => {
    writeDogData(selectedDog, selectedDog?.available_at, true);
    const walkingDogIdSet = writeUserData(currentUser, selectedDog?.id);
    console.log("walkingDogIdSet :>> ", walkingDogIdSet);
    setTimeout(function () {
      window.location.reload();
    }, 10000);
  };
  console.log("currentUser :>> ", currentUser);
  console.log("selectedDog :>> ", selectedDog);
  useEffect(() => {
    getDogData();
    getCurrentUser();
  }, [showLoading]);
  return (
    <IonContent>
      {marker && selectedDog?.dogName ? (
        <IonGrid className="ion-padding" style={{ height: "350px" }}>
          <IonRow className="ion-margin-bottom">
            <IonCol size="3">
              {" "}
              <IonAvatar>
                <IonImg
                  style={{ objectFit: "cover" }}
                  src={`https://firebasestorage.googleapis.com/v0/b/dogwalkdev.appspot.com/o/dogs%2F${selectedDog?.profile_picture}?alt=media&token=3a344a22-004d-472b-8f7b-813e40c8d7af`}
                />
              </IonAvatar>
            </IonCol>
            <IonCol size="9">
              <IonLabel>
                <h1>{selectedDog?.dogName}</h1>
                <IonNote>{selectedDog?.breed}</IonNote>
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-start ion-align-items-center">
            <IonCol size="2">
              <IonIcon
                icon={personOutline}
                color="primary"
                style={{ fontSize: "1.5rem" }}
              />
            </IonCol>
            <IonCol size="10">{marker?.username}</IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-start ion-align-items-center">
            <IonCol size="2">
              <IonIcon
                icon={locationOutline}
                color="primary"
                style={{ fontSize: "1.5rem" }}
              />
            </IonCol>
            <IonCol size="10">
              {marker?.latitude} {marker?.longitude}
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-start ion-align-items-center">
            <IonCol size="2">
              <IonIcon
                icon={phonePortraitOutline}
                color="primary"
                style={{ fontSize: "1.5rem" }}
              />
            </IonCol>
            <IonCol size="10">
              {selectedDog?.available_at
                ? selectedDog?.available_at
                : `${selectedDog?.dogName} n'est pas disponible pour le moment.`}
            </IonCol>
          </IonRow>

          <IonRow className="ion-align-items-center ion-text-center ion-margin-top">
            <IonCol size="12" className="ion-margin-bottom">
              {selectedDog?.taken ? (
                <IonButton
                  onClick={setTakenDog}
                  // href={`page/WalkSomeoneDogConfirm/${selectedDog?.id}`}
                  disabled
                >
                  <IonIcon icon={footstepsOutline} />
                  <IonText className="text-lg ion-padding-left">
                    {selectedDog?.dogName} a déjà été reservé !
                  </IonText>
                </IonButton>
              ) : (
                <IonButton
                  onClick={setTakenDog}
                  // href={`page/WalkSomeoneDogConfirm/${selectedDog?.id}`}
                  disabled={selectedDog?.available_at ? false : true}
                >
                  <IonIcon icon={footstepsOutline} />
                  <IonText className="text-lg ion-padding-left">
                    Réserver
                  </IonText>
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : (
        <>
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Chargement en cours..."}
            duration={10}
          />
        </>
      )}
    </IonContent>
  );
};
