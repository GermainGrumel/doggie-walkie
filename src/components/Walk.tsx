import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import { writeDogData, writeUserData } from "../utils/utils";
import { useHistory } from "react-router";
import { starOutline } from "ionicons/icons";

export const Walk = ({ currentUser, dogs }: any) => {
  const [currentWalkedDog, setCurrentWalkedDog] = useState<any>();

  const getCurrentDog = () => {
    const currentDog: any = dogs.find(
      (element: any) => element.id === currentUser?.walkingDogId
    );
    setCurrentWalkedDog(currentDog);
  };

  console.log("currentWalkedDog :>> ", currentWalkedDog);
  const finishDogWalk = () => {
    writeUserData(currentUser, "");
    writeDogData(currentWalkedDog, "", false);
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    getCurrentDog();
  }, []);
  return (
    <IonContent fullscreen class="ion-padding" scrollY={false}>
      <Swiper>
        <SwiperSlide>
          <IonRow
            className="ion-margin-top ion-margin-bottom"
            style={{ height: "10vh" }}
          ></IonRow>
          <div className="slide">
            <IonImg src="assets/icon/loader.gif" />
            <h2>Alors cette promenade {currentUser?.username} ?</h2>
            <IonText style={{ lineHeight: "1.5" }}>
              Tout s'est bien passé avec {currentWalkedDog?.dogName} ? <br />
              Donne nous ton ressenti suite à ta promenade !
            </IonText>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <IonRow
            className="ion-margin-top ion-margin-bottom"
            style={{ height: "10vh" }}
          ></IonRow>
          <div className="slide">
            <IonImg src="assets/icon/happyDog.gif" />
            <h2>
              Comment s'est passé la promenade avec {currentWalkedDog?.dogName}{" "}
              ?
            </h2>
            <IonRow className="ion-text-center ion-justify-content-center ion-align-items-center">
              <IonCol size="12">
                <IonIcon
                  style={{ fontSize: "32px" }}
                  className="ion-padding"
                  icon={starOutline}
                />
                <IonIcon
                  style={{ fontSize: "32px" }}
                  className="ion-padding"
                  icon={starOutline}
                />{" "}
                <IonIcon
                  style={{ fontSize: "32px" }}
                  className="ion-padding"
                  icon={starOutline}
                />{" "}
                <IonIcon
                  style={{ fontSize: "32px" }}
                  className="ion-padding"
                  icon={starOutline}
                />{" "}
                <IonIcon
                  style={{ fontSize: "32px" }}
                  className="ion-padding"
                  icon={starOutline}
                />
              </IonCol>
            </IonRow>

            <br />
            <IonRow className="ion-margin-top ion-text-center ion-justify-content-center ion-align-items-center">
              <IonText className="text-xl" style={{ lineHeight: "1.5" }}>
                <IonText color="primary">Aiguille ton prochain</IonText> en
                mettant une note !
              </IonText>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <IonRow
            className="ion-margin-top ion-margin-bottom"
            style={{ height: "10vh" }}
          ></IonRow>
          <div className="slide">
            <IonImg src="assets/icon/dog-unscreen.gif" />
            <h2>
              Nous sommes contents que la promenade se soit bien déroulée !
            </h2>
            <IonText style={{ lineHeight: "1.5" }}>
              En cliquant sur "Terminer la promenade", tu confirmes que{" "}
              {currentWalkedDog?.dogName} a bien été rendu à son propriétaire.
              <br />
              <br />
              Par la suite, tu recevras également tes 3€50 !
            </IonText>
            <br />
            <IonRow className="ion-margin-top ion-text-center ion-justify-content-center ion-align-items-center">
              <IonButton onClick={() => finishDogWalk()}>
                Terminer la promenade
              </IonButton>
            </IonRow>
          </div>
        </SwiperSlide>
      </Swiper>
    </IonContent>
  );
};
