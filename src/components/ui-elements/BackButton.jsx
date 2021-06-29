import React from "react";
import { ChevronLeft } from "react-feather";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: { paddingBottom: "2px" },
  text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#454955",
  },
}));

export default function BackButton({ onClick, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.icon}>
        {" "}
        <ChevronLeft size={14} />
      </div>

      <div className={classes.text}>{title}</div>
    </div>
  );
}
