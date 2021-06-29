import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      borderRadius: "20px!important",
      color: "#2D2D2D;",
      textTransform: "capitalize",
    },
  },
}));

export default function OutlinedButtons({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<FilterListSharpIcon />}
        size="large"
      >
        {title}
      </Button>
    </div>
  );
}
