import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "120px",
    height: "100px",
    boxShadow: "2px 2px 8px 8px #f5f5f5",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
  },
  row: {
    display: "flex",
    padding: "10px",

    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(66, 159, 186,0.1)",
      color: "#429FBA",
    },
  },
  text: {
    marginLeft: "10px",
  },
  icon: {},
}));

export default function EditPopUp() {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      <div className={classes.row}>
        <EditOutlinedIcon />
        <div className={classes.text}>Edit</div>
      </div>
      <div className={classes.row}>
        <DeleteOutlineOutlinedIcon />
        <div className={classes.text}>Delete</div>
      </div>
    </div>
  );
}
