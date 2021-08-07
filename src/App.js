import React from 'react'
import './App.css'
import Router from '../src/Router'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { requestFirebaseNotificationPermission, messaging } from './firebase'

function App() {
  return <Router />
}

export default App
