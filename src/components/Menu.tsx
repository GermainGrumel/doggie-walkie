import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  checkboxOutline,
  happyOutline,
  homeOutline,
  personOutline,
  walkOutline,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Homepage",
    url: "/page/HomePage",
    iosIcon: homeOutline,
    mdIcon: homeOutline,
  },
  {
    title: "Faire promener mon chien",
    url: "/page/WalkMyDog",
    iosIcon: checkboxOutline,
    mdIcon: checkboxOutline,
  },
  {
    title: "Promener un chien",
    url: "/page/WalkSomeoneDog",
    iosIcon: walkOutline,
    mdIcon: walkOutline,
  },
  {
    title: "Mes promenades",
    url: "/page/LastWalks",
    iosIcon: happyOutline,
    mdIcon: happyOutline,
  },
  {
    title: "Account",
    url: "/page/Account",
    iosIcon: personOutline,
    mdIcon: personOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Ilda</IonListHeader>
          <IonNote>I Love Dogs Altogether</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
