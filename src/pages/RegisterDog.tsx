import React, { useState } from "react";
import {
  IonButton,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonRouterLink,
  IonToast,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
  IonIcon,
} from "@ionic/react";

import { getDatabase, ref, set, child, push } from "firebase/database";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { addOutline } from "ionicons/icons";

function RegisterDog() {
  // INSCRIPTION
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState(false);
  const db = getDatabase();
  const newDogUid = push(child(ref(db), "dogs")).key;
  const today = new Date(),
    current_time =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  const state = { userName: "Germain" };
  const { photos, takePhoto } = usePhotoGallery();

  const writeDogData = async () => {
    await signUpRules();
    const dogData = {
      dogName: name,
      gender: gender,
      age: age,
      breed: breed,
      profile_picture: photos[0].webviewPath,
      owner: state.userName,
      id: newDogUid,
      creation_date: current_time,
    };
    try {
      if (data) {
        set(ref(db, "dogs/" + newDogUid), dogData).then((res) => {
          console.log("res :>> ", res);
        });
      }
    } catch (e) {
      console.log("ERROR FROM SIGN UP DOG", e);
    }
  };

  async function signUpRules() {
    try {
      setShowToast(false);
      console.log(breed, name, age, gender);
      if (breed === null || name === "" || age === "" || gender === null) {
        setColor("danger");
        setMessage("Tous les champs sont obligatoires");
        setShowToast(true);
        return;
      }
    } catch (error) {
      setColor("danger");
      setMessage(
        "Une erreur technique a eu lieu lors de la validation de votre compte"
      );
      setShowToast(true);
      return;
    }
    return setData(true);
  }
  console.log("photos", photos);

  return (
    <IonGrid slot="sign-up" id="sign-up">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        position="middle"
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
      <div className="block-register">
        <div className="register-mandatory ion-text-center">
          <IonText>Tous les champs sont obligatoires</IonText>
        </div>
        <IonRow className="block-avatar ion-justify-content-center">
          <IonCol class="avatar ion-no-padding" size="auto">
            <IonAvatar>
              <IonImg src={photos[0] ? photos[0].webviewPath : "#"} />
            </IonAvatar>
            <div className="add-avatar">
              <div>
                <IonIcon icon={addOutline} onClick={takePhoto} />
              </div>
            </div>
          </IonCol>
        </IonRow>
        {photos[0] ? (
          <IonRow className="ion-text-center ion-align-self-center">
            <IonCol className="ion-text-center ion-align-self-center">
              <IonButton
                className="ion-text-center ion-align-self-center"
                // onClick={publishPost}
              >
                Valider la photo
              </IonButton>
            </IonCol>
          </IonRow>
        ) : null}

        {/* GENDER */}
        <IonItem>
          <IonLabel color="dark">Sexe</IonLabel>
          <IonSelect
            value={gender}
            okText="OK"
            cancelText="Fermer"
            onIonChange={(e) => setGender(e.detail.value!)}
          >
            <IonSelectOption value="male">Mâle</IonSelectOption>
            <IonSelectOption value="femelle">Femelle</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* PRENOM */}
        <IonItem>
          <IonLabel position="floating" color="dark">
            Prénom :
          </IonLabel>
          <IonInput
            type="text"
            value={name}
            placeholder="Ex :Your name"
            onIonChange={(e) => setName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {/* AGE */}
        <IonItem>
          <IonLabel position="floating" color="dark">
            Age :
          </IonLabel>
          <IonInput
            type="number"
            value={age}
            placeholder="Ex : Age of the dog"
            onIonChange={(e) => setAge(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {/* BREED */}
        <IonItem>
          <IonLabel color="dark">Race du chien</IonLabel>
          <IonSelect
            value={breed}
            okText="OK"
            cancelText="Fermer"
            onIonChange={(e) => setBreed(e.detail.value!)}
          >
            <IonSelectOption value="Berger Australien">
              Berger Australien
            </IonSelectOption>
            <IonSelectOption value="BullDog Français">
              BullDog Français
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* profile_picture */}
        <IonItem>
          <IonLabel color="dark">Race du chien</IonLabel>
          <IonSelect
            value={breed}
            okText="OK"
            cancelText="Fermer"
            onIonChange={(e) => setBreed(e.detail.value!)}
          >
            <IonSelectOption value="Berger Australien">
              Berger Australien
            </IonSelectOption>
            <IonSelectOption value="BullDog Français">
              BullDog Français
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <div className="ion-padding-vertical"></div>
        <IonButton expand="full" onClick={writeDogData} color="primary">
          Inscription
        </IonButton>
        <div className="ion-margin-top ion-text-center">
          <IonRouterLink class="text-xl" color="dark" href="/">
            Retour
          </IonRouterLink>
        </div>
      </div>
    </IonGrid>
  );
}
export default RegisterDog;
