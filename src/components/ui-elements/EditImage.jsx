import React from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#429FBA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "absolute",
    bottom: 10,
    left: "53%",
    border: "4px solid white",
    cursor: "pointer",
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    height: "120px",

    alignSelf: "center",
    borderRadius: "50%",
    backgroundColor: "rgb(66, 159, 186,0.1)",
  },
  align: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#429FBA",
  },
}));
export default function EditImage({ src }) {
  const classes = useStyles();
  return (
    <div className={classes.align}>
      <div className={classes.image}>
        {" "}
        {src ? (
          <img src={src} alt="" style={{ position: "relative" }} />
        ) : (
          <div className={classes.text}>Your logo</div>
        )}
        <div className={classes.editIcon}>
          <EditOutlinedIcon style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
}
