import { Container, Row, Col, FormGroup, Label, Form } from "reactstrap";
import ProfilePic from "../../../assets/images/Ellipse 122.png";
import Input from "../../ui-elements/Input";
import DorpDown from "../../ui-elements/DorpDown";
import ImageUpload from "../../ui-elements/ImageUpload";
import Button from "../../ui-elements/Button";
import Units from "../../ui-elements/Units";
import EditImage from "../../ui-elements/EditImage";
import { Edit } from "react-feather";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    /* identical to box height, or 150% */

    letterSpacing: "0.6px",

    color: "#2B2B2B",
  },
}));

const AccountSettings = () => {
  const classes = useStyles();
  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" },
  ];
  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage src={ProfilePic} />
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Form>
          <Row form>
            <Col md={{ size: "4", offset: 2 }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  type="text"
                  label="First Name"
                  placeholder="John"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4" }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  type="text"
                  label="Last Name"
                  placeholder="Felix"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input height={"50px"} label="About" type="textarea" />
              </FormGroup>
            </Col>
            <Col md={{ size: "4", offset: 2 }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  type="date"
                  label="DOB"
                  placeholder="John"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4" }}>
              <FormGroup>
                <DorpDown
                  options={option}
                  label="Gender"
                  height={"50px"}
                  type="select"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "8", offset: 2 }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  label="Email"
                  type="email"
                  placeholder="Email@mail.com"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Units />
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="text-center">
              <Button text="SAVE CHANGES" width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AccountSettings;
