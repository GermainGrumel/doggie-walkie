import { GoogleMap } from "@capacitor/google-maps";
import {
  IonCol,
  IonIcon,
  IonLoading,
  IonRow,
  useIonModal,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { MarkerInfoWindow } from "./MarkerInfoWindow";
import { markers } from "../mocks";
import { fetchDogsData, fetchUsersData, findCurrentUser } from "../utils/utils";
import { getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import "../styles/DogMap.scss";
import {
  addOutline,
  checkmarkDoneOutline,
  checkmarkOutline,
  footstepsOutline,
  personOutline,
  removeOutline,
  timeOutline,
  walkOutline,
} from "ionicons/icons";
const DogMap: React.FC = () => {
  const state = useSelector((state: any) => state);
  const [dogs, setDogs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [showLoading, setShowLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [displayMenu, setDisplayMenu] = useState<any>(false);

  const db = getDatabase();
  const dbRef = ref(db);
  let newMap: any;
  const key: any = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const mapRef = useRef(null);

  const [present, dismiss] = useIonModal(MarkerInfoWindow, {
    marker: selectedMarker,
  });
  const modalOptions = {
    initialBreakpoint: 0.4,
    breakpoints: [0, 0.4],
    backdropBreakpoint: 0,
    onDidDismiss: () => dismiss(),
  };

  const displayMenuItems = () => {
    setDisplayMenu((prevCheck: boolean) => !prevCheck);
    console.log("displayMenu :>> ", displayMenu);
  };
  const fetchDatasFromDatabase = async () => {
    const dogsFromDatabase: any = await fetchDogsData(dbRef);
    const usersFromDatabase: any = await fetchUsersData(dbRef);
    if (dogsFromDatabase !== [] && usersFromDatabase !== []) {
      setDogs(dogsFromDatabase);
      setUsers(usersFromDatabase);
    }
  };

  const getCurrentUser: any = async () => {
    let findUser = await findCurrentUser(users, state);
    setCurrentUser(findUser);
  };

  useEffect(() => {
    fetchDatasFromDatabase();
  }, [showLoading]);

  useEffect(() => {
    createMap();
    getCurrentUser();
  }, [dogs, users]);

  const [mapConfig, setMapConfig] = useState({
    zoom: 14,
    center: {
      lat: 44.843696,
      lng: -0.58516,
    },
  });

  console.log("users :>> ", users);
  const markerClick = (marker: any) => {
    setSelectedMarker(
      markers.filter(
        (m: any) => m.lat === marker.latitude && m.lng === marker.longitude
      )[0]
    );
    present(modalOptions);
  };

  const addMapMarker = async (marker: any) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker.lat,
        lng: marker.lng,
      },
      iconUrl: "assets/icon/cool.png",
    });
  };

  const addMapMarkers = () =>
    markers.forEach((marker: any) => addMapMarker(marker));

  const createMap = async () => {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig,
    });

    newMap.setOnMarkerClickListener((marker: any) => markerClick(marker));
    addMapMarkers();
  };

  useIonViewWillEnter(() => createMap());

  return (
    <IonRow>
      <>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Chargement en cours..."}
          duration={3000}
        />
      </>
      <IonCol size="12">
        <div className="menu-container ">
          <div className="menu-items menu-item ion-text-center ion-justify-content-center ion-align-items-center">
            <IonIcon
              icon={displayMenu ? removeOutline : addOutline}
              color="primary"
              onClick={displayMenuItems}
            />
          </div>
          {displayMenu ? (
            <>
              <div className="menu-items menu-item-2 ion-text-center ion-justify-content-center ion-align-items-center">
                <IonIcon
                  icon={checkmarkOutline}
                  color="primary"
                  onClick={() => window.location.replace("/page/LastWalks")}
                />
              </div>

              <div className="menu-items menu-item-3 ion-text-center ion-justify-content-center ion-align-items-center">
                <IonIcon
                  icon={footstepsOutline}
                  color="primary"
                  onClick={() =>
                    window.location.replace("/page/WalkSomeoneDog")
                  }
                />
              </div>
              <div className="menu-items menu-item-4 ion-text-center ion-justify-content-center ion-align-items-center">
                <IonIcon
                  icon={personOutline}
                  color="primary"
                  onClick={() => window.location.replace("/page/Account")}
                />
              </div>

              <div className="menu-items menu-item-5 ion-text-center ion-justify-content-center ion-align-items-center">
                <IonIcon
                  icon={timeOutline}
                  color="primary"
                  onClick={() => window.location.replace("/page/WalkMyDog")}
                />
              </div>
            </>
          ) : null}
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
  );
};

export default DogMap;
