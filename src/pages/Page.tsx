import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/react";
import React, { useState } from "react";
// import { useStore } from "react-redux";
// import { Md5 } from "md5-typescript";
import { useParams } from "react-router";

// CSS & SCSS
import "./Page.css";

import shortid from "shortid";
// different page views
import Account from "./Account";
import Login from "./Login";
import SignUp from "./SignUp";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  // route to view with shortid generated
  const componentLoader = (name: string) => {
    switch (name) {
      case "Account":
        return <Account key={shortid.generate()}></Account>;
      case "Login":
        return <Login key={shortid.generate()}></Login>;
      case "SignUp":
        return <SignUp key={shortid.generate()}></SignUp>;
      default:
    }
  };

  const ContentComponent = componentLoader(name);

  // add view title in the header bar
  const getTitle = (name: string) => {
    switch (name) {
      case "Account":
        return "Compte";
      case "Login":
        return "Connexion";
      case "SignUp":
        return "Inscription";
      default:
        return name;
    }
  };

  const title = getTitle(name);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>
            <div className="ion-text-center text-xxxl">{title}</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {ContentComponent}
    </IonPage>
  );
};

export default Page;
