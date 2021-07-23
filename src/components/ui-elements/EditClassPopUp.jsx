import React from "react";
import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import Input from "./Input";
import "../../assets/css/login.css";
import "../../assets/css/button.css";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "../ui-elements/Button";
import { getClassrooms } from "../../redux/selectors";
import { connect } from "react-redux";
import { isEmpty, uniq } from "lodash";
import CustomCheckBox from "../ui-elements/CustomCheckBox";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    border: "1px solid #E6E6E6",
    boxSizing: "border-box",
    borderRadius: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const EditClassesPopup = ({
  toggle,
  classrooms,
  workoutClasses,
  setWorkoutClasses
}) => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    let arr = [];
    classrooms.forEach(val => arr.push(val.category));
    let cl = [];
    cl = classrooms.filter(val => workoutClasses.includes(val._id));
    let sval = [];
    cl.forEach(val => sval.push(val.title));
    setValue(sval);

    setCategories(uniq(arr));
  }, [workoutClasses]);

  return (
    <Container className="">
      <Row className="d-flex justify-content-center mb-5">
        <Col md="12" className="mt-3 ">
          <form className=" bg-light p-3  rounded ">
            <div className="d-flex justify-content-between">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "32px",

                  letterSpacing: "0.6px",

                  color: "#2B2B2B"
                }}
                className="  "
              >
                {" "}
                Add Classes
              </span>
              <CloseIcon
                fontSize="small"
                onClick={toggle}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Input placeholder="Search Classes" height="50px" backgroundColor />
            <div className={classes.root}>
              {isEmpty(categories)
                ? "Add Classes tO add in workout"
                : categories.map((cat, i) => (
                    <Accordion key={i}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {cat}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          <div>
                            {classrooms.map((classroom, i) => {
                              if (classroom.category !== cat) return;
                              return (
                                <CustomCheckBox
                                  key={i}
                                  label={classroom.title}
                                  value={value}
                                  showLabel
                                  id={classroom._id}
                                  ids={workoutClasses}
                                  setIds={setWorkoutClasses}
                                  setValue={setValue}
                                  indexing
                                />
                              );
                            })}
                          </div>
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </div>
            <div className="text-center">
              <Button text="Add" width="100%" height="3rem" />
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    classrooms: getClassrooms(state)
  };
};

export default connect(mapStateToProps, null)(EditClassesPopup);
