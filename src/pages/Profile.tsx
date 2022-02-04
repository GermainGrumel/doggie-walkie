import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import ".././styles/Profile.scss";

import {
  arrowBackOutline,
  arrowForward,
  bookmarkOutline,
  chatboxEllipsesOutline,
  ellipsisHorizontal,
  imageOutline,
  personAddOutline,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserState } from "../redux/actions";
import { getCurrentUser } from "../firebaseConfig";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username);
  let state = useSelector((state: any) => state);
  console.log("state :>> ", state);
  const updateFirebase = () => {
    getCurrentUser().then((user: any) => {
      user.isAvailable = toggle;
      dispatch(setUserState(user.isAvailable));
    });
  };

  return (
    <IonPage className="home">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light">
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton color="light">
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="topHeader"></div>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className="profileHeader">
                <IonCardContent>
                  <IonRow>
                    <IonCol size="4">
                      <img
                        src="/assets/img/profile-avatar.png"
                        alt="avatar"
                        className="avatar"
                      />
                    </IonCol>

                    <IonCol size="8">
                      <IonRow className="profileInfo">
                        <IonCol size="12">
                          <IonText color="dark" className="profileName">
                            <p>{username}</p>
                          </IonText>
                          {/* ICI */}
                          <IonToggle
                            checked={toggle}
                            onIonChange={(e) => setToggle(e.detail.checked)}
                          >
                            Available
                          </IonToggle>
                        </IonCol>
                      </IonRow>

                      <IonRow className="profileStats">
                        <IonCol className="profileStat">
                          <IonCardTitle>109</IonCardTitle>
                          <IonCardSubtitle>Chiens promenés</IonCardSubtitle>
                        </IonCol>

                        <IonCol className="profileStat">
                          <IonCardTitle>1.2k</IonCardTitle>
                          <IonCardSubtitle>Chiens</IonCardSubtitle>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6">
                      <IonButton fill="outline" expand="block">
                        Message
                      </IonButton>
                    </IonCol>

                    <IonCol size="6">
                      <IonButton
                        onClick={updateFirebase}
                        color="primary"
                        expand="block"
                      >
                        <IonIcon icon={personAddOutline} size="small" />
                        &nbsp; Save
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="profileStatusContainer">
            <IonCol size="12">
              <IonCard className="profileCard">
                <IonCardHeader>
                  <IonRow className="profileStatus">
                    <IonIcon icon={chatboxEllipsesOutline} />
                    <IonCardSubtitle>Status</IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>
                      I love posting content related to Ionic React! Make sure
                      to check out the Ionic React Hub!
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonCard className="profileCard">
                <IonCardContent>
                  <IonIcon icon={imageOutline} />
                  <IonCardTitle>147</IonCardTitle>
                  <IonCardSubtitle>Photos</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className="profileCard">
                <IonCardContent>
                  <IonIcon icon={bookmarkOutline} />
                  <IonCardTitle>63</IonCardTitle>
                  <IonCardSubtitle>Bookmarks</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard className="profileActionCard">
                <IonCardContent>
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>View latest project</IonCardSubtitle>
                    <IonIcon icon={arrowForward} />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
