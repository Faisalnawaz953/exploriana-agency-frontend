import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import Input from "./Input";
import "../../assets/css/login.css";
import "../../assets/css/button.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import pic from "../../assets/images/Ellipse 2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "1px solid #E6E6E6",
    boxSizing: "border-box",
    borderRadius: "20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const AddNewLocation = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="6" md="7" sm="9" xs="11" className="mt-3 ">
            <form className=" bg-light p-5  rounded ">
              <div className="d-flex justify-content-between">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    lineHeight: "32px",

                    letterSpacing: "0.6px",

                    color: "#2B2B2B",
                  }}
                  className="  "
                >
                  {" "}
                  Add New Location
                </span>
                <CloseIcon />
              </div>
              <Input label="Location" placeholder="Location" />
              <Input label="Address" placeholder="Address" />
              <Input label="postCode" placeholder="postCode" />

              <div className="text-center">
                <Button text="Add" width="100%" height="3rem" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="6" md="7" sm="9" xs="11" className="mt-3 ">
            <form className=" bg-light p-5  rounded ">
              <div className="d-flex justify-content-between">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    lineHeight: "32px",

                    letterSpacing: "0.6px",

                    color: "#2B2B2B",
                  }}
                  className="  "
                >
                  {" "}
                  Add Membership
                </span>
                <CloseIcon />
              </div>
              <Input label="Title" placeholder="Location" />
              <Input
                type="textarea"
                label="Description"
                placeholder="Details about your membership "
              />
              <Input label="Price per month" placeholder="123" />

              <div className="text-center">
                <Button text="Add" width="100%" height="3rem" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="6" md="7" sm="9" xs="11" className="mt-3 ">
            <form className=" bg-light p-5  rounded ">
              <div className="d-flex justify-content-between">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    lineHeight: "32px",

                    letterSpacing: "0.6px",

                    color: "#2B2B2B",
                  }}
                  className="  "
                >
                  {" "}
                  Create Message
                </span>
                <CloseIcon />
              </div>
              <Input label="who" placeholder="Name" />
              <Input
                type="textarea"
                label="Message"
                placeholder="Details about your membership "
              />

              <div className="text-center">
                <Button text="Add" width="100%" height="3rem" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="6" md="7" sm="9" xs="11" className="mt-3 ">
            <form className=" bg-light p-5  rounded ">
              <div className="d-flex justify-content-between">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    lineHeight: "32px",

                    letterSpacing: "0.6px",

                    color: "#2B2B2B",
                  }}
                  className="  "
                >
                  {" "}
                  Add Classes
                </span>
                <CloseIcon />
              </div>
              <Input
                placeholder="Search members"
                height="50px"
                backgroundColor
              />
              <div className={classes.root}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>CLass 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <div>
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                      </div>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>CLass 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <div>
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                      </div>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>CLass 3</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <div>
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomInline"
                          label="Featured"
                        />
                      </div>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="6" md="7" sm="9" xs="11" className="mt-3 ">
            <form className=" bg-light p-5  rounded ">
              <div className="d-flex justify-content-between">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    lineHeight: "32px",

                    letterSpacing: "0.6px",

                    color: "#2B2B2B",
                  }}
                  className="  "
                >
                  {" "}
                  Notifications (4)
                </span>
                <div>Mark all as read</div>
              </div>
              <Row className="border-bottom my-5">
                <Col md="2">
                  <img src={pic} />
                </Col>
                <Col md="8">
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </Col>
                <Col style={{ fontSize: "12px" }} md="2">
                  10 min
                </Col>
              </Row>

              <Row className="border-bottom my-5">
                <Col md="2">
                  <img src={pic} />
                </Col>
                <Col md="8">
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </Col>
                <Col style={{ fontSize: "12px" }} md="2">
                  10 min
                </Col>
              </Row>
              <Row className="border-bottom my-5">
                <Col md="2">
                  <img src={pic} />
                </Col>
                <Col md="8">
                  <b> Tom Barner joined to your class </b> <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </Col>
                <Col style={{ fontSize: "12px" }} md="2">
                  10 min
                </Col>
              </Row>

              <Row className="border-bottom my-5">
                <Col md="2">
                  <img src={pic} />
                </Col>
                <Col md="8">
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </Col>
                <Col style={{ fontSize: "12px" }} md="2">
                  10 min
                </Col>
              </Row>

              <div className="text-center">
                <Button text="Add" width="100%" height="3rem" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddNewLocation;
