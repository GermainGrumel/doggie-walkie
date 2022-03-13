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
  IonRow,
  IonIcon,
  IonCol,
  IonRouterLink,
} from "@ionic/react";

import {
  closeCircleOutline,
  checkmarkCircleOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";
import { getDatabase, ref, set, child, push } from "firebase/database";
import { auth } from "../config/firebase";

function RegisterDog() {
  // CONNEXION
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  // INSCRIPTION
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = React.useState(false);

  const db = getDatabase();
  const dbRef = ref(db);
  const newDogUid = push(child(ref(db), "dogs")).key;
  const today = new Date(),
    current_time =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  const state = { userName: "Germain" };

  const writeDogData = () => {
    signUpRules();

    const dogData = {
      dogName: name,
      gender: gender,
      dogPicture: dogPicture,
      age: age,
      breed: breed,
      owner: state.userName,
      id: newDogUid,
      creation_date: current_time,
    };
    if (data) {
      try {
        set(ref(db, "dogs/" + newDogUid), dogData).then(() => {
          auth.currentDog = [];
          auth.currentDog.push(dogData);
        });
      } catch (e) {
        console.log("ERROR FROM SIGN UP DOG", e);
      }
    }
  };

  async function register() {
    if (password !== cpassword) {
      setColor("danger");
      setMessage("Les mots de passe ne correspondent pas");
      setShowToast(true);
    }
    if (username.trim() === "" || password.trim() === "") {
      setColor("danger");
      setMessage("Le mot de passe ne peut pas être vide");
      setShowToast(true);
    }
  }

  async function signUpRules() {
    try {
      setShowToast(false);
      if (
        breed === "" ||
        name === "" ||
        breed === "" ||
        age === "" ||
        gender !== null
      ) {
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

  return (
    <IonGrid slot="sign-up" id="sign-up">
      <div className="block-register">
        <div className="register-mandatory ion-text-center">
          <IonText>Tous les champs sont obligatoires</IonText>
        </div>
        {/* GENDER */}
        <IonItem>
          <IonLabel color="dark">Civilité</IonLabel>
          <IonSelect
            value={gender}
            okText="OK"
            cancelText="Fermer"
            onIonChange={(e) => setGender(e.detail.value!)}
          >
            <IonSelectOption value="monsieur">Monsieur</IonSelectOption>
            <IonSelectOption value="madame">Madame</IonSelectOption>
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
            placeholder="Ex : Votre prénom"
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
            placeholder="Ex : Votre prénom"
            onIonChange={(e) => setName(e.detail.value!)}
          ></IonInput>
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
