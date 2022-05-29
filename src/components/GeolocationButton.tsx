import {
  IonButton,
  IonCol,
  IonLoading,
  IonRow,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Geolocation } from "@ionic-native/geolocation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersData,
  findCurrentUser,
  writeUserDataWithPosition,
} from "../utils/utils";
import { getDatabase, ref } from "firebase/database";

interface LocationError {
  showError: boolean;
  message?: string;
}
const GeolocationButton: React.FC = () => {
  const [showLoading, setShowLoading] = React.useState(true);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<LocationError>({ showError: false });
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});

  const state = useSelector((state: any) => state);
  console.log("state", state);

  const db = getDatabase();
  const dbRef = ref(db);

  const getCurrentUser = () => {
    let findUser = findCurrentUser(users, state);
    setCurrentUser(findUser);
  };
  useIonViewWillEnter(() => getCurrentUser());
  console.log("currentUser :>> ", !!currentUser);
  console.log("currentUser :>> ", currentUser);

  const getLocation = async () => {
    setShowLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      writeUserDataWithPosition(
        currentUser.username,
        currentUser.password,
        currentUser.email,
        currentUser.id,
        currentUser.creation_date,
        position.coords.latitude,
        position.coords.longitude
      );
      setShowLoading(false);
      setError({ showError: false, message: undefined });
    } catch (e: any) {
      const message =
        e.message.length > 1
          ? e.message
          : "Cannot get user location. Check permissions";
      setShowLoading(false);
      setError({ showError: true, message });
    }
  };

  const fetchDatasFromDatabase = async () => {
    const usersFromDatabase: any = await fetchUsersData(dbRef);
    if (usersFromDatabase !== []) {
      setUsers(usersFromDatabase);
    }
  };

  useEffect(() => {
    fetchDatasFromDatabase();
    getCurrentUser();
  }, [showLoading]);

  // useEffect(() => {
  //   updateUserProfile();
  // }, [position]);

  // const updateUserProfile = () => {
  //   if (user && user.latitude && user.longitude) {
  //     user.latitude = position?.coords.latitude;
  //     user.longitude = position?.coords.longitude;
  //     dispatch(setUserLocalisation(user));
  //   } else {
  //     console.log("cc");
  //   }
  // };
  return (
    <IonRow
      style={{ height: "100%" }}
      className="ion-align-items-center ion-text-center ion-justify-content-center"
    >
      {!!currentUser ? (
        <IonCol>
          <IonToast
            isOpen={error.showError}
            message={error.message}
            onDidDismiss={() =>
              setError({ showError: false, message: undefined })
            }
            duration={5000}
          />

          <IonButton onClick={getLocation}>
            {position
              ? `${position.coords.latitude} ${position.coords.longitude}`
              : "Get Location"}
          </IonButton>
        </IonCol>
      ) : (
        <>
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Chargement en cours..."}
            duration={5000}
          />
        </>
      )}
    </IonRow>
  );
};

export default GeolocationButton;
