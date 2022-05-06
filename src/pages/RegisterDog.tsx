import React, { useEffect, useState } from "react";
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
import axios from "axios";
function RegisterDog() {
  // INSCRIPTION
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>("");
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
  const defaultDogPicture =
    "https://cdn.dribbble.com/users/673318/screenshots/13978786/media/5c307ab803776b5ae728e20e43d545fe.png?compress=1&resize=400x300&vertical=top";
  const writeDogData = async () => {
    await signUpRules();
    const dogData = {
      dogName: name,
      gender: gender,
      age: age,
      breed: breed,
      profile_picture: photos[0] ? photos[0].filepath : defaultDogPicture,
      owner: state.userName,
      id: newDogUid,
      creation_date: current_time,
    };
    try {
      if (data) {
        set(ref(db, "dogs/" + newDogUid), dogData)
          .then((res) => {
            console.log("res :>> ", res);
          })
          .then(() => {
            window.location.href = "/page/HomePage";
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
      } else {
        setData(true);
      }
    } catch (error) {
      setColor("danger");
      setMessage(
        "Une erreur technique a eu lieu lors de la validation de votre compte"
      );
      setShowToast(true);
      return;
    }
  }

  const uploadImage = () => {
    const formData: any = new FormData();
    formData.append("file", profilePicture.filepath);
    formData.append("upload_preset", "jxvmfrwf");
    axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dp4i4x7tk/image/upload/",
      data: `${photos[0].webviewPath}`,
    })
      .then((r: any) => r.json())
      .catch((e) => {
        console.log("e", e);
      });
  };
  useEffect(() => {
    setProfilePicture(photos[0]);
  }, [photos]);

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
              <IonImg
                src={photos[0] ? photos[0].webviewPath : defaultDogPicture}
              />
            </IonAvatar>
            <div className="add-avatar">
              <div>
                <IonIcon
                  icon={addOutline}
                  onClick={takePhoto}
                  onChange={(e: any) => setProfilePicture(e.target.value![0])}
                />
              </div>
            </div>
          </IonCol>
        </IonRow>
        {photos[0] ? (
          <IonRow className="ion-text-center ion-align-self-center">
            <IonCol className="ion-text-center ion-align-self-center">
              <IonButton
                className="ion-text-center ion-align-self-center"
                onClick={uploadImage}
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
