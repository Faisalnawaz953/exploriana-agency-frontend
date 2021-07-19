import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Classess from "../../pages/Library/Classes/Classess";

const useStyles = makeStyles(theme => ({
  root: {
    color: "#429FBA",

    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "30px",
    padding: "10px",
    "&:hover": {
      backgroundColor: "rgb(66, 159, 186,0.1)",
      borderRadius: "20px"
    }
  }
}));
export default function TextButton({ label, marginRight, onClick }) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ marginRight: marginRight ? marginRight : "" }}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
