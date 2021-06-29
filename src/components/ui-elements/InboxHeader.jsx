import React from "react";
import { ChevronLeft } from "react-feather";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "react-feather";
import * as classe from "../../css/Messages.module.css";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    borderRadius: "20px",
    color: "#429FBA",
    border: "1px solid #429FBA",
    "&:hover": {
      color: "#429FBA",
      backgroundColor: "rgb(66, 159, 186,0.1)",
      border: "1px solid #429FBA",
    },
  },
}));

export default function InboxHeader() {
  const classes = useStyles();
  return (
    <div className="d-flex justify-content-between pt-1 p-2 align-items-center">
      <div className="d-flex align-items-center justify-content-center ">
        <div>
          <ChevronLeft size={16} />
        </div>
        <div className={classe.back}>Back</div>
      </div>
      <div className={classe.headText}>Inbox</div>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<Edit size={18} />}
      >
        Create New
      </Button>
    </div>
  );
}
