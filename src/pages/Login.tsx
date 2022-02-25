import {
  IonButton,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToast,
  IonRouterLink,
  IonRow,
  IonIcon,
  IonCol,
} from "@ionic/react";
import {
  closeCircleOutline,
  checkmarkCircleOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";

import React, { useState } from "react";
import { useStore } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";

// Firebase REALTIME DATABASE
import { getDatabase, ref, set } from "firebase/database";

// CUSTOM STYLES
import "../styles/Login.scss";
const Login: React.FC = () => {
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [showConnexion, setShowConnexion] = React.useState(true);
  const [showInscription, setShowInscription] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const state = useStore().getState();

  /* ON ENLEVE LA PREMIERE LETTRE DU TELEPHONE POUR EVITER DES +3306  */
  const phoneNum: string = "+33" + phoneNumber.substring(1);

  const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, "users/" + state.uid), {
      username: name + " " + familyName,
      gender: gender,
      password: pass,
      email: email,
      phoneNumber: phoneNum,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleAddClickConnexion = () => {
    setShowConnexion(!showConnexion);
    if (showInscription === true) {
      setShowInscription(false);
    }
  };

  const handleAddClickInscription = () => {
    setShowInscription(!showInscription);
    if (showConnexion === true) {
      setShowConnexion(false);
    }
  };

  const emailCheck =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  function handleSubmit(event: any) {
    signUp();
  }

  async function signUp() {
    try {
      setShowToast(false);
      if (
        email === "" ||
        pass === "" ||
        name === "" ||
        familyName === "" ||
        phoneNumber === ""
      ) {
        setColor("danger");
        setMessage("Tous les champs sont obligatoires");
        setShowToast(true);
        return;
      }
      if (phoneNumber.length !== 10 || !phoneNumber.match(/^-?\d+$/)) {
        setColor("danger");
        setMessage(
          "Votre numéro de téléphone est invalide : vous devez entrer un numéro de mobile à 10 chiffres."
        );
        setShowToast(true);
        return;
      }
      if (emailCheck === false) {
        setColor("danger");
        setMessage("Votre mail est invalide.");
        setShowToast(true);
        return;
      }
      if (pass.length < 8 || pass.toLowerCase() === pass) {
        setColor("danger");
        setMessage(
          "Votre mot de passe est invalide. Il doit contenir 8 caractères au minimum dont 1 majuscule"
        );
        setShowToast(true);
        return;
      }
      if (pass !== passConfirm) {
        setColor("danger");
        setMessage(
          "Votre mot de passe et sa confirmation ne correspondent pas"
        );
        setShowToast(true);
        return;
      }
      window.location.href = "/";
    } catch (error) {
      setColor("danger");
      setMessage(
        "Une erreur technique a eu lieu lors de la validation de votre compte"
      );
      setShowToast(true);
      return;
    }
  }
  return (
    <div className="page-login ion-padding-top">
      <div className="ion-text-center">
        <IonImg className="logo" src="assets/icon/logo.png" />
        <IonText className="slogan text-md" color="dark">
          Votre partenaire E-learning
        </IonText>
        <IonButton color="primary" onClick={() => handleAddClickConnexion()}>
          J'ai déjà un compte
        </IonButton>
        <IonButton color="primary" onClick={() => handleAddClickInscription()}>
          Je veux m'inscrire
        </IonButton>
      </div>
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
      {/* CONNEXION */}
      {/* {showConnexion === true ? (
        <AmplifyAuthenticator>
          <AmplifySignIn
            hideSignUp
            headerText="Connectez-vous"
            submitButtonText="Connexion"
            slot="sign-in"
          ></AmplifySignIn>
        </AmplifyAuthenticator>
      ) : null} */}
      {/* FIN CONNEXION */}

      {/* INSCRIPTION */}

      {showInscription === true ? (
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

            {/* NOM */}
            <IonItem>
              <IonLabel position="floating" color="dark">
                Nom :
              </IonLabel>
              <IonInput
                type="text"
                value={familyName}
                placeholder="Ex : Votre nom de famille"
                onIonChange={(e) => setFamilyName(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {/* EMAIL */}

            {emailCheck === false ? (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  E-mail :
                </IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  placeholder="Ex : monmail@gmail.com"
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="danger"
                  icon={closeCircleOutline}
                ></IonIcon>
              </IonItem>
            ) : (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  E-mail :
                </IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  placeholder="Ex : monmail@gmail.com"
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  color="success"
                  icon={checkmarkCircleOutline}
                  size="medium"
                ></IonIcon>
              </IonItem>
            )}

            {/* TELEPHONE */}

            {phoneNumber.length !== 10 || !phoneNumber.match(/^-?\d+$/) ? (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  N° tel mobile : (10 chiffres.)
                </IonLabel>
                <IonInput
                  type="tel"
                  value={phoneNumber}
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                  placeholder="Ex : 0612345678"
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="danger"
                  icon={closeCircleOutline}
                ></IonIcon>
              </IonItem>
            ) : (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  N° tel mobile : (10 chiffres)
                </IonLabel>
                <IonInput
                  type="tel"
                  value={phoneNumber}
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                  placeholder="Ex : 0612345678"
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  color="success"
                  icon={checkmarkCircleOutline}
                  size="medium"
                ></IonIcon>
              </IonItem>
            )}

            {/* PASSWORD */}
            {pass.length < 8 || pass.toLowerCase() === pass ? (
              <IonRow>
                <IonCol size="1">
                  <IonIcon
                    color="danger"
                    icon={closeCircleOutline}
                    size="medium"
                  ></IonIcon>
                </IonCol>
                <IonCol size="11">
                  <IonText
                    className="ion-justify-content-center ion-align-self-center password-checkbox-text text-md"
                    color="dark"
                  >
                    Minimum 8 caractères avec une majuscule
                  </IonText>
                </IonCol>
              </IonRow>
            ) : (
              <IonRow>
                <IonCol size="1">
                  <IonIcon
                    color="success"
                    icon={checkmarkCircleOutline}
                    size="medium"
                  ></IonIcon>
                </IonCol>

                <IonCol size="11">
                  <IonText
                    className="ion-justify-content-center ion-align-self-center password-checkbox-text text-md"
                    color="dark"
                  >
                    Minimum 8 caractères avec une majuscule
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            {showPassword === true ? (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  Mot de passe :
                </IonLabel>
                <IonInput
                  className="register-password"
                  type="text"
                  value={pass}
                  onIonChange={(e) => setPass(e.detail.value!)}
                  onClick={() => setShowInscription(true)}
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="primary"
                  icon={eyeOffOutline}
                  onClick={() => handleShowPassword()}
                ></IonIcon>
              </IonItem>
            ) : (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  Mot de passe :
                </IonLabel>
                <IonInput
                  className="register-password"
                  type="password"
                  value={pass}
                  onIonChange={(e) => setPass(e.detail.value!)}
                  onClick={() => setShowInscription(true)}
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="primary"
                  icon={eyeOutline}
                  onClick={() => handleShowPassword()}
                ></IonIcon>
              </IonItem>
            )}

            {/* PASSWORD CONFIRM */}
            {showPasswordConfirm === true ? (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  Confirmation du mot de passe :
                </IonLabel>
                <IonInput
                  className="register-password"
                  type="text"
                  value={passConfirm}
                  onIonChange={(e) => setPassConfirm(e.detail.value!)}
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="primary"
                  icon={eyeOffOutline}
                  onClick={() => handleShowPasswordConfirm()}
                ></IonIcon>
              </IonItem>
            ) : (
              <IonItem>
                <IonLabel position="floating" color="dark">
                  Confirmation du mot de passe :
                </IonLabel>
                <IonInput
                  className="register-password"
                  type="password"
                  value={passConfirm}
                  onIonChange={(e) => setPassConfirm(e.detail.value!)}
                ></IonInput>
                <IonIcon
                  className="ion-justify-content-center ion-align-self-center"
                  slot="end"
                  size="medium"
                  color="primary"
                  icon={eyeOutline}
                  onClick={() => handleShowPasswordConfirm()}
                ></IonIcon>
              </IonItem>
            )}
            {pass !== null && passConfirm.length !== 0 ? (
              <>
                {passConfirm === pass ? (
                  <IonRow>
                    <IonIcon
                      size="medium"
                      color="success"
                      icon={checkmarkCircleOutline}
                    ></IonIcon>
                    <IonText
                      className="ion-justify-content-center ion-align-self-center password-checkbox-text text-md"
                      color="dark"
                    >
                      Mots de passe identiques
                    </IonText>
                  </IonRow>
                ) : (
                  <IonRow>
                    <IonIcon
                      color="danger"
                      icon={closeCircleOutline}
                      size="medium"
                    ></IonIcon>
                    <IonText
                      className="ion-justify-content-center ion-align-self-center password-checkbox-text text-md"
                      color="dark"
                    >
                      Ce n'est pas le même mot de passe
                    </IonText>
                  </IonRow>
                )}
              </>
            ) : null}

            {/* SUBMIT */}
            <div className="ion-padding-vertical"></div>
            <IonButton expand="full" onClick={writeUserData} color="primary">
              Inscription
            </IonButton>
            <div className="ion-margin-top ion-text-center">
              <IonRouterLink class="text-xl" color="dark" href="/">
                Retour
              </IonRouterLink>
            </div>
          </div>
        </IonGrid>
      ) : null}
    </div>
  );
};

export default Login;
