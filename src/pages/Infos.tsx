import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonLoading,
  IonButton,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import "../styles/Account.scss";
import { useStore } from "react-redux";

import "../styles/Infos.scss";

const Infos: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  let user = state.user;
  const [gender, setGender] = React.useState<string>(user.gender);
  const [username, setUsername] = useState<string>(user.username);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  function updateUser() {
    setLoading(true);
    setMessage("Vos informations ont été mises à jour.");
    setColor("success");
    setShowToast(true);
    setLoading(false);
    console.log("s", user);

    user = {
      id: user.id,
      phone: phone,
      email: email,
      gender: gender,
      username: username,
    };
    console.log("user :>> ", user);
  }

  let button = <span></span>;
  if (changed) {
    button = (
      <div className="footer-buttons active ion-text-center">
        <IonButton color="primary" onClick={(e) => updateUser()}>
          Valider mes modifications
        </IonButton>
      </div>
    );
  }
  return (
    <IonContent className="page-footer">
      <IonGrid>
        <IonRow></IonRow>
        <IonRow className="form">
          <IonCol>
            <IonItem>
              <IonLabel color="dark">
                <IonText color="dark">Civilité</IonText>
              </IonLabel>
              <IonSelect
                value={gender}
                onIonChange={(e) => setGender(e.detail.value!)}
                okText="OK"
                cancelText="Fermer"
              >
                <IonSelectOption value="Monsieur">Monsieur</IonSelectOption>
                <IonSelectOption value="Madame">Madame</IonSelectOption>
                <IonSelectOption value="Ne se prononce pas">
                  Ne se prononce pas
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                <IonText className="text-xxl" color="dark">
                  Prénom
                </IonText>
              </IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e) => {
                  setUsername(e.detail.value!);
                  setChanged(true);
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                {" "}
                <IonText className="text-xxl" color="dark">
                  E-mail
                </IonText>
              </IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => {
                  setEmail(e.detail.value!);
                  setChanged(true);
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                {" "}
                <IonText className="text-xxl" color="dark">
                  N° téléphone mobile
                </IonText>
              </IonLabel>
              <IonInput
                type="tel"
                value={phone}
                onIonChange={(e) => {
                  setPhone(e.detail.value!);
                  setChanged(true);
                }}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>

      {button}
      <IonLoading
        isOpen={loading}
        message={"Chargement en cours..."}
        spinner="crescent"
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        position="top"
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
    </IonContent>
  );
};

export default Infos;
