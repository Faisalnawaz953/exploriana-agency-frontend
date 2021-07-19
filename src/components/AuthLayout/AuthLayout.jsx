import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as classes from "../../css/AuthLayout.module.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

export default function AuthLayout(props) {
  return (
    <Provider template={AlertTemplate} {...options}>
      <div className={classes.layout}>
        <Header />
        {props.children}
        <Footer />
      </div>
    </Provider>
  );
}
