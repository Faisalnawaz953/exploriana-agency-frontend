import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import * as classes from "../../css/AuthLayout.module.css"
import { positions, Provider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import ParticlesBg from "particles-bg"
const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
}

export default function AuthLayout(props) {
  return (
    <Provider template={AlertTemplate} {...options}>
      <ParticlesBg
        num={200}
        type="cobweb"
        bg={{
          position: "absolute",

          width: "100%"
        }}
      />
      <div className={classes.layout}>
        <Header />
        {props.children}
        <Footer />
      </div>
    </Provider>
  )
}
