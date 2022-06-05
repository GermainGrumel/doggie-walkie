import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import { useSelector } from "react-redux";

export const Welcome = () => {
  const state = useSelector((state: any) => state);
  console.log("state :>> ", state);

  return (
    <IonContent fullscreen class="ion-padding" scrollY={false}>
      <Swiper>
        <SwiperSlide>
          <IonRow
            className="ion-margin-top ion-margin-bottom"
            style={{ height: "10vh" }}
          ></IonRow>
          <div className="slide">
            <IonImg src="assets/icon/helloDog.gif" />
            <h2>Bienvenue {state?.user?.username} !</h2>
            <IonText style={{ lineHeight: "1.5" }}>
              Dog Walker est une application qui te permet de faire promener ton
              chien ou d'en promener, c'est l'application idéale pour nos
              compagnons canins !
            </IonText>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <IonRow
            className="ion-margin-top ion-margin-bottom"
            style={{ height: "10vh" }}
          ></IonRow>
          <div className="slide">
            <IonImg
              style={{ height: "270px", width: "361px" }}
              src="assets/icon/sleepDog.gif"
            />
            <h2>Promène des chiens ou fais promener le tien !</h2>
            <IonText style={{ lineHeight: "1.5" }}>
              Tu n'as pas le temps de promener ton chien ou tu souhaites en
              promener pour une petite somme d'argent ?
            </IonText>{" "}
            <br />
            <IonRow className="ion-margin-top ion-text-center ion-justify-content-center ion-align-items-center">
              <IonText className="text-xl" style={{ lineHeight: "1.5" }}>
                <IonText color="primary">Dog Walker</IonText> est la solution à
                ce problème !
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
            <IonImg src="assets/icon/dogWalk.gif" />
            <h2>
              Découvre ton quartier et les chiens disponibles aux alentours !
            </h2>
            <IonText style={{ lineHeight: "1.5" }}>
              Découvre quels sont les chiens disponibles autour de ta position
              ou inscris ton chien pour que d'autres personnes le promènent à ta
              place !
            </IonText>
            <br />
            <IonRow className="ion-margin-top ion-text-center ion-justify-content-center ion-align-items-center">
              <IonButton className="text-xs" href="page/HomePage">
                Découvrir les chiens autour de moi !
              </IonButton>
            </IonRow>
          </div>
        </SwiperSlide>
      </Swiper>
    </IonContent>
  );
};
