import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonAvatar,
  IonTitle,
  IonList,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { useStore } from "react-redux";
import { powerOutline } from "ionicons/icons";
import "../styles/Account.scss";

const Account: React.FC = () => {
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const user = state.user;
  return (
    <IonContent className="page-account">
      <div className="background-container">
        <IonImg className="background-cover" src="assets/images/account.jpg" />
      </div>
      <div className="user-name ion-text-center">
        <IonText className="text-xxl">Bienvenue {user.username}</IonText>
      </div>

      <div className="ion-text-center ion-padding-top top-text">
        <IonText className="text-xl">
          Gérez vos informations, ainsi que la confidentialité et la sécurité de
          vos données sur DogWalker.
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
                    Consulte les données de ton compte DogWalker et sélectionne
                    les informations à enregistrer pour personnaliser ton
                    expérience DogWalker.
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Modifier mon mot de passe</IonCardTitle>
                <IonItem href="/page/Password" detail={true} lines="none">
                  <IonCardContent className="ion-padding-top">
                    Modifie ton mot de passe afin de sécuriser au maximum ton
                    compte et d'éviter qu'un tiers se connecte sur ton compte
                    DogWalker .
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* SECOND ROW */}
        <IonRow className="ion-align-self-center">
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Conditions Générales d'Utilisation et RGPD
                </IonCardTitle>
                <IonItem href="/page/Cgurgpd" detail={true} lines="none">
                  <IonCardContent className="ion-padding-top">
                    Retrouvez ici les Conditions Générales d'Utilisation et les
                    Mentions Légales de DogWalker. Découvrez également comment
                    nous utilisons les cookies dans le respect de la RPGD.
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="logout-card">
          <IonCol>
            <IonItem
              detail={false}
              // onClick={(e) => {
              //   logout();
              // }}
            >
              <IonCard>
                <IonCardHeader>
                  <IonRow className="next-to-each-other">
                    <IonIcon color="primary" icon={powerOutline} />
                    <IonCardTitle>Se déconnecter</IonCardTitle>
                  </IonRow>
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
