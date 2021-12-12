import { Redirect, Route } from "react-router-dom";
import { setUserState } from "./redux/actions";
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
import Home from "./pages/Home";
import Login from "./pages/Registration/Login";
import RegisterDog from "./pages/Registration/RegisterDog";
import RegisterUser from "./pages/Registration/RegisterUser";

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
import { useDispatch } from "react-redux";
const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" component={Home} exact />
          <Route path="/register-dog" component={RegisterDog} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register-user" component={RegisterUser} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/register-dog">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
const App: React.FC = () => {
  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((user: any) => {
      console.log("user", user);
      if (user) {
        dispatch(setUserState(user.email));
        window.history.replaceState({}, "", "/");
      } else {
        window.history.replaceState({}, "", "/login");
      }
      setBusy(false);
    });
  }, []);

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>;
};
export default App;
