import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/react";
import React from "react";
// import { useStore } from "react-redux";
// import { Md5 } from "md5-typescript";
import { useParams } from "react-router";

// CSS & SCSS
import "./Page.css";

import shortid from "shortid";
// different page views
import Account from "./Account";
import Infos from "./Infos";
import Login from "./Login";
import HomePage from "./HomePage";
import RegisterDog from "./RegisterDog";
import WalkSomeoneDog from "./WalkSomeoneDog";
import WalkSomeoneDogConfirm from "./WalkSomeoneDogConfirm";
import WalkMyDog from "./WalkMyDog";
import { useStore } from "react-redux";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const state = useStore().getState();
  const { id } = useParams<{ id: string }>();

  // route to view with shortid generated
  const componentLoader = (name: string) => {
    console.log("name", name);

    switch (name) {
      case "Account":
        return <Account key={shortid.generate()}></Account>;
      case "Infos":
        return <Infos key={shortid.generate()}></Infos>;
      case "Login":
        return <Login key={shortid.generate()}></Login>;
      case "HomePage":
        return <HomePage key={shortid.generate()}></HomePage>;
      case "RegisterDog":
        return <RegisterDog key={shortid.generate()}></RegisterDog>;
      case "WalkSomeoneDog":
        return <WalkSomeoneDog key={shortid.generate()}></WalkSomeoneDog>;
      case "WalkMyDog":
        return <WalkMyDog key={shortid.generate()}></WalkMyDog>;
      case "WalkSomeoneDogConfirm":
        return (
          <WalkSomeoneDogConfirm
            key={shortid.generate()}
          ></WalkSomeoneDogConfirm>
        );
      default:
    }
  };

  const ContentComponent = componentLoader(name);

  // add view title in the header bar
  const getTitle = (name: string) => {
    switch (name) {
      case "Account":
        return "Compte";
      case "Infos":
        return "Tes informations";
      case "Login":
        return "Connexion";
      case "SignUp":
        return "Inscription";
      case "HomePage":
        return "Accueil";
      case "RegisterDog":
        return "Inscris ton chien !";
      case "WalkSomeoneDog":
        return "Promener le chien de quelqu'un !";
      default:
        return name;
    }
  };

  const getNav = (name: string) => {
    switch (name) {
      case "WalkSomeoneDogConfirm":
        return (
          <IonBackButton defaultHref="/page/WalkSomeoneDog" text="Retour" />
        );
      default:
        return <IonMenuButton />;
    }
  };
  const nav = getNav(name);
  const title = getTitle(name);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">{nav}</IonButtons>
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
