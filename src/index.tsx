import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { getCurrentUser } from "./pages/Login";

const saveToLocalStorage = (setUser: any) => {
  try {
    localStorage.setItem("state", setUser);
  } catch (e) {
    console.error(e);
  }
};
const loadFromLocalStorage = () => {
  try {
    const stateStr: any = localStorage.getItem("state");
    console.log(Object.values(stateStr));
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const triggerAuth = () => {
  getCurrentUser().then((user) => {
    const setUser = (state = {}, action: any) => {
      state = action.user;
      return state;
    };
    const setData = (userData: any) => ({
      type: "SET_USER",
      id: 0,
      user: userData, // défini plus haut
    });
    const store = createStore(setUser);
    loadFromLocalStorage();
    store.subscribe(() => {
      saveToLocalStorage(store.getState());
    });
    // Redux affiche user
    store.dispatch(setData(user));
    console.log("user", user);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
};

triggerAuth();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
