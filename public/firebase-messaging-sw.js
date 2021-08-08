// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyAPHWp6e5AdtCb-Q8OX4Uvecj_x1Wkv9Gw',
  authDomain: 'moove-e00d7.firebaseapp.com',
  projectId: 'moove-e00d7',
  storageBucket: 'moove-e00d7.appspot.com',
  messagingSenderId: '975589270155',
  appId: '1:975589270155:web:8d258cfc8efa9c9b79ea8e',
  measurementId: 'G-5SSRL7HPJV'
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
  console.log('Received background message ', payload)
})
