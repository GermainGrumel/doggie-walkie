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
  IonContent,
} from "@ionic/react";
import {
  closeCircleOutline,
  checkmarkCircleOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";

import React, { useEffect, useState } from "react";

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
import { getDatabase, ref, set, child, get, push } from "firebase/database";
import { registerUser, loginUser } from "../config/firebase";
// CUSTOM STYLES
import "../styles/Login.scss";
import { useHistory } from "react-router";
import {
  fetchUsersData,
  getCurrentTime,
  writeUserDataFromRegistration,
} from "../utils/utils";

const Login: React.FC = () => {
  // CONNEXION
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // INSCRIPTION
  const [name, setName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");

  // TOAST
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  // DISPLAYS
  const [showConnexion, setShowConnexion] = React.useState(true);
  const [showInscription, setShowInscription] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [data, setData] = React.useState(false);

  const history = useHistory();
  const db = getDatabase();
  const dbRef = ref(db);
  const newUserUid = push(child(ref(db), "users")).key;
  const currentTime = getCurrentTime();

  const getInscription = () => {
    setShowInscription(true);
    setShowConnexion(false);
  };
  const getConnexion = () => {
    setShowInscription(false);
    setShowConnexion(true);
  };

  async function login() {
    const res = await loginUser(username, password);
    if (!res) {
      setColor("danger");
      setMessage(
        "L'utilisateur n'existe pas. Veuillez vérifier vos informations."
      );
      setShowToast(true);
    } else {
      setColor("success");
      setMessage("Bienvenue !");
      setShowToast(true);
      history.push("/page/HomePage");
    }
    console.log(`${res ? "Login success" : "Login failed"}`);
  }

  async function register() {
    if (
      name.trim() === "" ||
      pass.trim() === "" ||
      familyName.trim() === "" ||
      email.trim() === ""
    ) {
      setColor("danger");
      setMessage("Le mot de passe ne peut pas être vide");
      setShowToast(true);
    }
    signUpRules();

    const response: any = await writeUserDataFromRegistration(
      name,
      familyName,
      pass,
      email,
      newUserUid,
      currentTime
    );
    console.log("response :>> ", response);
    const res: any = await registerUser(email, pass);
    if (!res) {
      setColor("danger");
      setMessage("Un incident technique s'est produit.");
      setShowToast(true);
    } else {
      setColor("success");
      setMessage("Bienvenue !");
      setShowToast(true);
      window.location.replace("/page/HomePage");
    }
  }

  useEffect(() => {
    fetchUsersData(dbRef);
  }, []);

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

  const emailCheck =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  async function signUpRules() {
    try {
      setShowToast(false);
      if (email === "" || pass === "" || name === "" || familyName === "") {
        setColor("danger");
        setMessage("Tous les champs sont obligatoires");
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
      // window.location.href = "/Page/HomePage";
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
    <IonContent>
      <div className="page-login ion-padding-top">
        <div className="ion-text-center">
          <IonImg className="logo" src="assets/icon/logo.png" />
          <IonText
            className="slogan text-md ion-padding ion-margin"
            color="dark"
          >
            Prenez soin de votre animal de compagnie préféré !
          </IonText>
          {showConnexion ? null : (
            <IonButton
              color="primary"
              onClick={() => handleAddClickConnexion()}
            >
              J'ai déjà un compte
            </IonButton>
          )}
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
        {showConnexion ? (
          <>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                required
                placeholder="Entrez votre email"
                onIonChange={(e) => setUsername(e.detail.value!)}
                clearInput
                value={username}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Mot de passe</IonLabel>
              <IonInput
                type="password"
                required
                placeholder="Entrez un mot de passe"
                onIonChange={(e) => setPassword(e.detail.value!)}
                clearInput
                value={password}
              />{" "}
            </IonItem>
            <IonRow className="ion-align-items-center ion-justify-content-center ">
              <IonButton
                onClick={login}
                className="ion-margin-top"
                type="submit"
              >
                Se connecter
              </IonButton>
              <IonText className="text-lg ion-margin-top" color="medium">
                Pas encore de compte ?{" "}
                <IonText color="primary" onClick={getInscription}>
                  Inscrivez vous !
                </IonText>
              </IonText>
            </IonRow>
          </>
        ) : null}
        {/* FIN CONNEXION */}

        {/* INSCRIPTION */}

        {showInscription ? (
          <IonGrid slot="sign-up" id="sign-up">
            <div className="block-register">
              <div className="register-mandatory ion-text-center">
                <IonText>Tous les champs sont obligatoires</IonText>
              </div>

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
                <>
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
                </>
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
              <IonButton expand="full" onClick={register} color="primary">
                Inscription
              </IonButton>
              <div className="ion-margin-top ion-text-center">
                <IonRouterLink
                  class="text-xl"
                  color="dark"
                  onClick={getConnexion}
                >
                  Retour
                </IonRouterLink>
              </div>
            </div>
          </IonGrid>
        ) : null}
      </div>
    </IonContent>
  );
};

export default Login;
