import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: " #429FBA  ",
    borderRadius: "20px!important",
    color: "white",
    textTransform: "capitalize",
    "&:hover": {
      background: "#429FBA",
    },
  },
}));

export default function IconButton({ title, onClick }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        onClick={onClick}
        variant="contained"
        color=" "
        className={classes.button}
        startIcon={<AddIcon />}
        size="large"
      >
        {title}
      </Button>
    </div>
  );
}
