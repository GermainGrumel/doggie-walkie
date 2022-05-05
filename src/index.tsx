import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider, useStore } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import authReducer from "./store/reducers/authReducer";
import firebase from "firebase/compat/app";

import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};
console.log(rrfProps);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
