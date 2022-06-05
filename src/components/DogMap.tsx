import { GoogleMap } from "@capacitor/google-maps";
import {
  IonButton,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLoading,
  IonRow,
  IonText,
  IonToast,
  useIonModal,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { MarkerInfoWindow } from "./MarkerInfoWindow";
import { findWhoBookedDog, writeUserDataWithLocation } from "../utils/utils";
import { Geolocation } from "@ionic-native/geolocation";
import WalkMyDog from "../pages/WalkMyDog";
import "../styles/DogMap.scss";
import {
  addOutline,
  footstepsOutline,
  navigateOutline,
  pawOutline,
  personOutline,
  timeOutline,
} from "ionicons/icons";
import Account from "../pages/Account";

interface LocationError {
  showError: boolean;
  message?: string;
}
interface User {
  latitude: number;
  longitude: number;
  username: string;
  hasDog: boolean;
  walkingDogId: string;
  creation_date: string;
  marker?: any;
  id: string;
}

interface mapConfig {
  zoom: any;
  center?: { lat: number; lng: number };
}
const DogMap = ({ currentUser, dogs, users }: any) => {
  let newMap: any;
  const key: any = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const mapRef = useRef(null);

  const [showLoading, setShowLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<LocationError>({ showError: false });
  const [currentUserDog, setCurrentUserDog] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [mapConfig, setMapConfig] = useState<any>({
    zoom: 18,
    center: {
      lat: currentUser?.latitude,
      lng: currentUser?.longitude,
    },
  });

  const [present, dismiss] = useIonModal(MarkerInfoWindow, {
    marker: selectedMarker,
  });

  const [presentWalkMyDog, dismissWalkMyDog] = useIonModal(WalkMyDog, {
    dog: currentUserDog,
  });

  const [presentAccount, dismissAccount] = useIonModal(Account, {
    currentUser: currentUser,
  });

  const modalOptionsAccount = {
    initialBreakpoint: 0.9,
    breakpoints: [0, 1],
    backdropBreakpoint: 0,
    onDidDismiss: () => dismiss(),
  };

  const modalOptionsWalkMyDog = {
    initialBreakpoint: 0.9,
    breakpoints: [0, 0.4],
    backdropBreakpoint: 0,
    onDidDismiss: () => dismiss(),
  };

  const modalOptions = {
    initialBreakpoint: 0.6,
    breakpoints: [0, 0.6],
    backdropBreakpoint: 0,
    onDidDismiss: () => dismiss(),
  };

  const markerClick = (marker: User) => {
    setSelectedMarker(
      users.filter(
        (m: any) =>
          m.latitude === marker.latitude && m.longitude === marker.longitude
      )[0]
    );
    present(modalOptions);
  };

  const walkMyDogMenuClick = () => {
    presentWalkMyDog(modalOptionsWalkMyDog);
  };
  const accountMenuClick = () => {
    presentAccount(modalOptionsAccount);
  };
  const addMapMarker = async (marker: User) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker.latitude,
        lng: marker.longitude,
      },
      iconUrl:
        currentUser.latitude === marker.latitude
          ? "assets/icon/cool.png"
          : "assets/icon/happy.png",
    });
  };

  const addMapMarkers = () =>
    users.forEach((marker: User) =>
      marker.hasDog ? addMapMarker(marker) : null
    );

  const createMap = async () => {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig,
    });

    newMap.setOnMarkerClickListener((marker: User) => markerClick(marker));
    addMapMarkers();
  };

  useIonViewWillEnter(() => createMap());

  const getCurrentDog = () => {
    const currentDog: any = dogs.find(
      (element: any) => element.owner_id === currentUser?.id
    );
    setCurrentUserDog(currentDog);
  };

  const userBookedDog = async () => {
    const booker = await findWhoBookedDog(users, currentUserDog);
    if (booker) {
      setShowToast(true);
      setColor("primary");
      setMessage(
        `${currentUserDog.dogName} a été réservé par ${booker.username}`
      );
    }
  };

  const getLocation = async () => {
    setShowLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log("position :>> ", position);
      setPosition(position);
      console.log("currentUser :>> ", currentUser);
      writeUserDataWithLocation(
        currentUser,
        position.coords.latitude,
        position.coords.longitude
      );
      setShowLoading(false);
      setError({ showError: false, message: undefined });
      window.location.reload();
    } catch (e: any) {
      const message =
        e.message.length > 1
          ? e.message
          : "Cannot get user location. Check permissions";
      setShowLoading(false);
      setError({ showError: true, message });
    }
  };
  console.log("mapConfig", mapConfig);

  useEffect(() => {
    getCurrentDog();
    createMap();
  }, []);

  useEffect(() => {
    userBookedDog();
  }, [showLoading, position]);
  return (
    <>
      {currentUser?.latitude ? (
        <IonRow>
          <IonCol size="12">
            {/* <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={message}
              position="middle"
              color={color}
              duration={10000}
              buttons={[
                {
                  icon: "close",
                  role: "Fermer",
                  handler: () => {},
                },
              ]}
            /> */}
            <div className="menu-container ">
              <div className="menu-items menu-item ion-text-center ion-justify-content-center ion-align-items-center">
                <IonFab vertical="center" horizontal="center" slot="fixed">
                  <IonFabButton>
                    <IonIcon
                      icon={
                        !!currentUser?.latitude ? addOutline : navigateOutline
                      }
                      onClick={() =>
                        currentUser?.latitude ? null : getLocation()
                      }
                    />
                  </IonFabButton>
                  {currentUser?.latitude ? (
                    <>
                      <IonFabList side="bottom">
                        <IonFabButton>
                          <IonIcon
                            icon={pawOutline}
                            color="primary"
                            onClick={() =>
                              window.location.replace("/page/RegisterDog")
                            }
                          />
                        </IonFabButton>
                      </IonFabList>
                      <IonFabList side="start">
                        <IonFabButton>
                          <IonIcon
                            icon={personOutline}
                            color="primary"
                            onClick={() => accountMenuClick()}
                          />{" "}
                        </IonFabButton>
                      </IonFabList>
                      <IonFabList side="top">
                        <IonFabButton>
                          <IonIcon
                            icon={timeOutline}
                            color="primary"
                            onClick={() => walkMyDogMenuClick()}
                          />{" "}
                        </IonFabButton>
                      </IonFabList>
                    </>
                  ) : (
                    <>
                      <IonLoading
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={"Chargement en cours..."}
                        duration={2000}
                      />
                    </>
                  )}
                </IonFab>
              </div>
            </div>
            <div style={{ height: "100vh", width: "100vw" }}>
              <capacitor-google-map
                ref={mapRef}
                id="map"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                }}
              ></capacitor-google-map>
            </div>
          </IonCol>
        </IonRow>
      ) : (
        <>
          <IonRow
            style={{ height: "100%" }}
            className="ion-align-items-center ion-text-center ion-justify-content-center"
          >
            <IonCol>
              <IonButton onClick={getLocation}>Me localiser</IonButton>
            </IonCol>
          </IonRow>
        </>
      )}
    </>
  );
};

export default DogMap;
