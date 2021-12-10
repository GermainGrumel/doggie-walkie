import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import RegisterDog from "./pages/RegisterDog";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./firebaseConfig";
const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact />
          <Route path="/tab2" component={Tab2} exact />
          <Route path="/tab3" component={Tab3} exact />
          <Route path="/registerdog" component={RegisterDog} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register-user" component={RegisterUser} exact />
          <Route path="/" component={Tab1} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="registerdog" href="/registerdog">
            <IonIcon icon={triangle} />
            <IonLabel>RegisterDog</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
const App: React.FC = () => {
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        window.location.href = "/home";
      } else {
        window.location.href = "/";
      }
      setBusy(false);
    });
  }, []);

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>;
};
export default App;
