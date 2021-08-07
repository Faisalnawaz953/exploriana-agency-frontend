import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyAPHWp6e5AdtCb-Q8OX4Uvecj_x1Wkv9Gw",
    authDomain: "moove-e00d7.firebaseapp.com",
    projectId: "moove-e00d7",
    storageBucket: "moove-e00d7.appspot.com",
    messagingSenderId: "975589270155",
    appId: "1:975589270155:web:8d258cfc8efa9c9b79ea8e",
    measurementId: "G-5SSRL7HPJV"
  };

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();
export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() =>
        messaging.getToken({
          vapidKey: "BLwM3v_nYHt1eoGIFe46dNEWi78rNdrd4_OdNPI2sBE6gUBh9pE6ZjQMKxnd3LlMatQ6m72s48XPnnKkkaI0tOM",
        })
      )
      .then((firebaseToken) => {
        console.log("Token in firbase init ");
        resolve(firebaseToken);
      })
      .catch((err) => {
        console.log("Fire base Error ============> ", err);

        reject(err);
      });
  });
