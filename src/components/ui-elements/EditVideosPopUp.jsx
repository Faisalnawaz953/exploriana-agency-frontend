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
import { getVideos } from "../../redux/selectors";
import { connect } from "react-redux";
import { uniq, isEmpty } from "lodash";
import CustomCheckBox from "./CustomCheckBox";

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

const EditVideosPopup = ({
  toggle,
  videos,
  workoutVideos,
  setWorkoutVideos
}) => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    let arr = [];
    videos.forEach(val => arr.push(val.category));
    let vid = [];
    vid = videos.filter(val => workoutVideos.includes(val._id));
    let sval = [];
    vid.forEach(val => sval.push(val.title));

    setValue(sval);
    setCategories(uniq(arr));
  }, [workoutVideos]);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
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
                Add Videos
              </span>
              <CloseIcon
                fontSize="small"
                onClick={toggle}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Input placeholder="Search Videos" height="50px" backgroundColor />
            <div className={classes.root}>
              {isEmpty(categories)
                ? "Add Classes tO add in workout"
                : categories.map((cat, ind) => (
                    <Accordion key={ind}>
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
                            {videos.map((video, i) => {
                              if (video.category !== cat) return;
                              return (
                                <CustomCheckBox
                                  key={i}
                                  label={video.title}
                                  value={value}
                                  showLabel
                                  id={video._id}
                                  ids={workoutVideos}
                                  setIds={setWorkoutVideos}
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
          </form>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    videos: getVideos(state)
  };
};

export default connect(mapStateToProps, null)(EditVideosPopup);
