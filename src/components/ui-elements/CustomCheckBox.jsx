import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#429FBA",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#429FBA"
    }
  }
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      //   inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
}

export default function CustomizedCheckbox({
  label,
  value,
  setValue,
  showLabel,
  id,
  ids,
  setIds,
  indexing
}) {
  return (
    <div className="d-flex align-items-center justift-content-center">
      <StyledCheckbox
        checked={value && value.includes(label)}
        onClick={() => {
          if (value.includes(label)) {
            let arr = [...value];
            var index = arr.indexOf(label);

            if (index > -1) {
              arr.splice(index, 1);
            }
            setValue(arr);
          } else {
            let arr = [...value];
            arr.push(label);
            setValue(arr);
          }
          if (indexing) {
            if (ids.includes(id)) {
              let ar = [...ids];
              var inde = ar.indexOf(id);

              if (inde > -1) {
                ar.splice(inde, 1);
              }
              setIds(ar);
            } else {
              let ar = [...ids];
              ar.push(id);
              setIds(ar);
            }
          }
        }}
      />
      <label className="mt-2">{showLabel && label}</label>
    </div>
  );
}
