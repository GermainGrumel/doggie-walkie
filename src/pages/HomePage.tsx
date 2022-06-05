import {
  IonContent,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonItem,
  IonLabel,
  IonModal,
  IonInput,
  IonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/HomePage.scss";
import DogMap from "../components/DogMap";
import { fetchDogsData, fetchUsersData, findCurrentUser } from "../utils/utils";
import { getDatabase, ref } from "firebase/database";
import { Walk } from "../components/Walk";
import { getAuth } from "firebase/auth";

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

const HomePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const auth: any = getAuth();
  const db = getDatabase();
  const dbRef = ref(db);
  const [username, setUsername] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, setUsers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const fetchDatasFromDatabase = async () => {
    const dogsFromDatabase: any = await fetchDogsData(dbRef);
    const usersFromDatabase: any = await fetchUsersData(dbRef);
    if (dogsFromDatabase !== [] && usersFromDatabase !== []) {
      setDogs(dogsFromDatabase);
      setUsers(usersFromDatabase);
    }
  };

  const getCurrentUser: any = async () => {
    let findUser: User = await findCurrentUser(users, auth.currentUser.email);
    setCurrentUser(findUser);
  };

  useEffect(() => {
    fetchDatasFromDatabase();
    getCurrentUser();
  }, [showLoading]);
  useEffect(() => {
    getCurrentUser();
  }, [users, dogs]);

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
    <IonContent class="page-home" fullscreen>
      {currentUser ? (
        currentUser?.walkingDogId ? (
          <Walk currentUser={currentUser} dogs={dogs} />
        ) : currentUser && dogs && users ? (
          <DogMap currentUser={currentUser} dogs={dogs} users={users} />
        ) : (
          <>
            <IonLoading
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={"Chargement en cours..."}
              duration={3000}
            />
          </>
        )
      ) : (
        <>
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Chargement en cours..."}
            duration={3000}
          />
        </>
      )}
    </IonContent>
  );
};
export default HomePage;
