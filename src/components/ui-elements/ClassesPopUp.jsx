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

export default function ClassesPopup({ toggle }) {
  const classes = useStyles();
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

                  color: "#2B2B2B",
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
            <Input placeholder="Search members" height="50px" backgroundColor />
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
  );
}
