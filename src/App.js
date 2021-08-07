import React from "react";
import "./App.css";
import Router from "../src/Router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  requestFirebaseNotificationPermission,
  messaging,
} from "./firebase"



function App() {

   requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
      // setDeviceToken(firebaseToken);
    })
    .catch((err) => {
      console.log("Error ===========> ", err);
      return err;
    });
   messaging.onMessage((mes) => {
    console.log("Mesage recieved ===> ", mes);
  });

  return <Router />;
}

export default App;
