import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { powerOutline } from "ionicons/icons";
import "../styles/Account.scss";
import { logoutUser } from "../config/firebase";

const Account: React.FC = ({ currentUser }: any) => {
  console.log("currentUserrrrrr :>> ", currentUser);
  return (
    <IonContent className="page-account">
      <div className="user-name ion-text-center">
        <IonText className="text-xxl">
          Que souhaites-tu faire {currentUser?.username} ?
        </IonText>
      </div>

      <div className="ion-text-center ion-padding-top top-text">
        <IonText className="text-xl">
          Gérez vos informations, ainsi que la confidentialité et la sécurité de
          vos données sur Ilda.
        </IonText>
      </div>

      <IonGrid>
        <IonRow className="ion-align-self-center">
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Mes informations</IonCardTitle>
                <IonItem href="/page/Infos" detail={true} lines="none">
                  <IonCardContent className="ion-padding-top">
                    Consulte les données de ton compte DogWalker et modifies-y
                    tes informations
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-align-self-center">
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Inscrire mon chien</IonCardTitle>
                <IonItem href="/page/RegisterDog" detail={true} lines="none">
                  <IonCardContent className="ion-padding-top">
                    Inscris ton chien pour pouvoir que les autres utilisateurs
                    puissent le promener à ta place !
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* SECOND ROW */}

        {/* <IonRow className="ion-align-self-center">
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Modifier mon mot de passe</IonCardTitle>
                <IonItem href="/page/Password" detail={true} lines="none">
                  <IonCardContent className="ion-padding-top">
                    Modifie ton mot de passe afin de sécuriser au maximum ton
                    compte et d'éviter qu'un tiers se connecte sur ton compte
                    Ilda .
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow> */}

        {/* SECOND ROW */}
        <IonRow className="ion-align-self-center">
          <IonCol>
            <IonItem>
              <IonCard onClick={logoutUser}>
                <IonCardHeader>
                  <IonIcon color="primary" icon={powerOutline} />
                  <IonCardTitle>Se déconnecter</IonCardTitle>
                  <IonCardContent className="ion-padding margin-auto ion-text-center">
                    Se déconnecter de DogWalker.
                  </IonCardContent>
                </IonCardHeader>
              </IonCard>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default Account;
