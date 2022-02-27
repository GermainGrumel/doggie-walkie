import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonText,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonButton,
} from "@ionic/react";
import { addOutline, powerOutline } from "ionicons/icons";
import React from "react";
import { useHistory, useParams } from "react-router";
import { logoutUser } from "../config/firebase";
// import { useStore } from "react-redux";
// AVATAR
import { Md5 } from "md5-typescript";

const Page: React.FC = () => {
  //   const state = useStore().getState();
  // eslint-disable-next-line
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  //   let endpoint = state.endpoint;

  // AVATAR
  //   const gravatar = "https://gravatar.com/avatar/" + Md5.init(state.email);

  const logout = () => {
    logoutUser();
    history.push("/page/Login");
  };
  return (
    <IonContent className="page-account">
      {/* <div className="background-container">
        <IonImg className="background-cover" src="assets/tmp/acccount.png" />
      </div>
      <IonRow className="block-avatar ion-justify-content-center">
        <IonCol class="avatar ion-no-padding" size="auto">
          <IonAvatar>
            <IonImg src={gravatar} />
          </IonAvatar>
        </IonCol>
      </IonRow> */}

      <div className="user-name ion-text-center">
        <IonText className="text-xxl">Bienvenue</IonText>
      </div>

      <div className="ion-text-center ion-padding-top top-text">
        <IonText className="text-xl">
          Gérez vos informations, ainsi que la confidentialité et la sécurité de
          vos données sur Formaceo.
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
                    Consulte les données de ton compte Formaceo et sélectionnez
                    les informations à enregistrer pour personnaliser ton
                    expérience Formaceo.
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
                    Formaceo .
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
                    Mentions Légales de Formaceo. Découvrez également comment
                    nous utilisons les cookies dans le respect de la RPGD.
                  </IonCardContent>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard className="premium-content">
              <IonCardHeader>
                <IonCardTitle color="primary">
                  Passer à Formaceo Premium
                </IonCardTitle>
                <IonItem
                  href="/page/Premium"
                  detail={true}
                  lines="none"
                  color="primary"
                >
                  <IonCardContent className="ion-padding-top ">
                    Passe ton abonnement à Formaceo Premium et profite du
                    contenu Boulangerie & Pâtisserie de Formaceo dans un
                    abonnement d'une durée de 36 mois !
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
              onClick={(e) => {
                logout();
              }}
            >
              <IonCard>
                <IonCardHeader>
                  <IonRow className="next-to-each-other">
                    <IonIcon color="primary" icon={powerOutline} />
                    <IonCardTitle>Se déconnecter</IonCardTitle>
                  </IonRow>
                  <IonCardContent className="ion-padding margin-auto ion-text-center">
                    Se déconnecter de Formaceo.
                  </IonCardContent>
                </IonCardHeader>
              </IonCard>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonList className="account-links">
          {/* <IonItem>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={createOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Carnet de recettes</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}

          {/* <IonItem>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={starOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Mon abonnement</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}

          {/* <IonItem href="/page/Notifications" detail={false}>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={heartOutline} />
                </IonCol>
                <IonCol>
                  <IonText className="text-md">
                    <b>Gestion des notifications</b>
                  </IonText>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon color="primary" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonItem> */}
        </IonList>
      </IonGrid>
    </IonContent>
  );
};

export default Page;
