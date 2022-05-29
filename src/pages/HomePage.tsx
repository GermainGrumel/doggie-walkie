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
  IonItem,
  IonAvatar,
  IonTitle,
  IonToast,
  IonImg,
  IonIcon,
  IonList,
  IonLabel,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonModal,
  IonInput,
  IonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { child, get, getDatabase, ref } from "firebase/database";
import "../styles/HomePage.scss";
import { fetchDogsData, fetchUsersData, findCurrentUser } from "../utils/utils";
import { setUserState } from "../store/actions/userActions";
import { updateUserProfile } from "../config/firebase";
import GeolocationButton from "../components/GeolocationButton";
import DogMap from "../components/DogMap";
import { arrowForwardOutline, pawOutline, starOutline } from "ionicons/icons";
const HomePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const state = useSelector((state: any) => state);
  const db = getDatabase();
  const dbRef = ref(db);
  const dispatch = useDispatch();
  const history = useHistory();

  const [chosenDog, setChosenDog] = useState("");
  const [dogs, setDogs] = useState([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const fetchDatasFromDatabase = async () => {
    const dogsFromDatabase: any = await fetchDogsData(dbRef);
    const usersFromDatabase: any = await fetchUsersData(dbRef);
    if (dogsFromDatabase !== [] && usersFromDatabase !== []) {
      setDogs(dogsFromDatabase);
      setUsers(usersFromDatabase);
    }
  };

  useIonViewWillEnter(() => getCurrentUser());
  console.log("state :>> ", state);
  const getCurrentUser = () => {
    let findUser = findCurrentUser(users, state);
    setCurrentUser(findUser);
  };
  useEffect(() => {
    fetchDatasFromDatabase();
    getCurrentUser();
  }, [showLoading]);

  const firstLogin = (
    <>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonRow className="ion-align-items-center ion-text-center ion-padding-top">
          <IonCol>
            <IonText className="text-xxl" color="primary">
              Bienvenue sur Ilda !
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-text-center ion-padding-top">
          <IonCol>
            <IonText className="text-xl" color="primary">
              Apprenons à nous connaître !
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-text-center ion-padding-top">
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="dark">
                Comment veux-tu qu'on t'appelle ?
              </IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>
          </IonCol>
        </IonRow>{" "}
        {username ? (
          <IonRow className="ion-align-items-center ion-text-center ion-padding-top">
            <IonCol>
              <IonButton color="primary" className="text-md">
                Confirmer
              </IonButton>{" "}
            </IonCol>
          </IonRow>
        ) : null}
      </IonModal>
    </>
  );

  return (
    <IonContent class="page-home">
      <DogMap />
    </IonContent>
  );
};
export default HomePage;
