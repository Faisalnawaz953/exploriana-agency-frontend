import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(1),
    backgroundColor: "rgba(251, 251, 251, 1)",

    height: "3rem",
    borderRadius: "20px ",
    cursor: "pointer",
  },
}));

export default function Tags({ tags, selectedTags, setSelectedTags }) {
  const classes = useStyles();

  return (
    <div>
      {tags.map((val, i) => {
        return (
          <Chip
            key={i}
            style={{
              backgroundColor:
                selectedTags && selectedTags.includes(val) && "#429FBA",
              color: selectedTags && selectedTags.includes(val) && "white",
            }}
            className={classes.chip}
            onClick={() => {
              if (selectedTags.includes(val)) {
                let tagArray = [...selectedTags];
                const index = tagArray.indexOf(val);
                if (index > -1) {
                  tagArray.splice(index, 1);
                  setSelectedTags(tagArray);
                }
              } else {
                let tagArray = [...selectedTags];
                tagArray.push(val);
                setSelectedTags(tagArray);
              }
            }}
            label={val}
          />
        );
      })}
    </div>
  );
}
