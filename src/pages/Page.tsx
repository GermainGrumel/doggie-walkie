// import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
// import './Page.css';

// const Page: React.FC = () => {

//   const { name } = useParams<{ name: string; }>();

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>

//           <IonTitle>{name}</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large">{name}</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <ExploreContainer name={name} />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Page;
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

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // const state = useStore().getState();
  // eslint-disable-next-line
  // const gravatar = "https://gravatar.com/avatar/" + Md5.init(state.email);

  // route to view with shortid generated
  const componentLoader = (name: string) => {
    switch (name) {
      case "Account":
        return <Account key={shortid.generate()}></Account>;
      default:
    }
  };

  const ContentComponent = componentLoader(name);

  // add view title in the header bar
  const getTitle = (name: string) => {
    switch (name) {
      case "Account":
        return "Compte";
      default:
        return name;
    }
  };

  const title = getTitle(name);

  // const getNav = (name: string) => {
  //   switch (name) {
  //     case "Video":
  //       return <IonBackButton defaultHref="/page/Videos" text="Retour" />;
  //     case "Infos":
  //     case "Password":
  //     case "Cgurgpd":
  //       return <IonBackButton defaultHref="/page/Account" text="Retour" />;
  //     case "RecipePublish":
  //       return <IonBackButton defaultHref="/page/Recipes" text="Retour" />;
  //     case "RecipeEdit":
  //       return <IonBackButton defaultHref="/page/Recipes" text="Retour" />;
  //     case "RecipeBookPublish":
  //       return <IonBackButton defaultHref="/page/RecipeBook" text="Retour" />;
  //     case "RecipeBookEdit":
  //       return <IonBackButton defaultHref="/page/RecipeBook" text="Retour" />;
  //     case "RecipeBookView":
  //       return <IonBackButton defaultHref="/page/RecipeBook" text="Retour" />;
  //     case "RescuePublish":
  //       return <IonBackButton defaultHref="/page/Rescue" text="Retour" />;
  //     case "RescueEdit":
  //       return <IonBackButton defaultHref="/page/Rescue" text="Retour" />;
  //     case "HelpContentView":
  //       return <IonBackButton defaultHref="/page/Help" text="Retour" />;
  //     case "Premium":
  //     case "Notifications":
  //       return <IonBackButton defaultHref="/page/Home" text="Retour" />;
  //     default:
  //       return <IonMenuButton />;
  //   }
  // };

  // const nav = getNav(name);

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
