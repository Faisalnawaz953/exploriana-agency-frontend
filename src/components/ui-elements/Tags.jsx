import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { isEmpty } from "lodash";
import Button from "../../components/ui-elements/Button";
import Input from "../ui-elements/Input";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    margin: theme.spacing(1),
    backgroundColor: "rgba(251, 251, 251, 1)",

    height: "3rem",
    borderRadius: "20px ",
    cursor: "pointer"
  }
}));

export default function Tags({
  tags,
  selectedTags,
  setSelectedTags,
  setTags,
  newTag
}) {
  const classes = useStyles();
  const [showInput, setShowInput] = React.useState(false);
  const [category, setCategory] = React.useState("");

  return (
    <>
      <div className="d-flex align-items-center flex-wrap ">
        {tags.map((val, i) => {
          return (
            <Chip
              key={i}
              style={{
                backgroundColor:
                  selectedTags && selectedTags.includes(val) && "#429FBA",
                color: selectedTags && selectedTags.includes(val) && "white"
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
                  if (!isEmpty(selectedTags)) return;
                  let tagArray = [...selectedTags];
                  tagArray.push(val);
                  setSelectedTags(tagArray);
                }
              }}
              label={val}
            />
          );
        })}
        {newTag && (
          <div style={{ paddingBottom: "20px" }}>
            {" "}
            <Button
              text={showInput ? "Cancel" : "New +"}
              height="3rem"
              onClick={() => setShowInput(!showInput)}
            />
          </div>
        )}
      </div>
      {showInput && (
        <>
          <Input
            type="text"
            label={`Add New Category`}
            color="white "
            height="50px"
            placeholder="Enter New Category Name"
            backgroundColor
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <div style={{ marginTop: "-30px" }}>
            <Button
              text={"Add Category"}
              height="2.5rem"
              onClick={() => {
                if (category !== "" && !tags.includes(category)) {
                  let cat = [...tags];
                  cat.push(category);
                  console.log(cat);
                  setTags(cat);
                  setCategory("");
                  setShowInput(false);
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
