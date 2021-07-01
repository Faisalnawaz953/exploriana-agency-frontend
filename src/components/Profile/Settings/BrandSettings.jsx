import { Container, Row, Col, FormGroup, Label, Form } from "reactstrap";
import ProfilePic from "../../../assets/images/Ellipse22.png";
import Input from "../../ui-elements/Input";
import DorpDown from "../../ui-elements/DropDown";
import Button from "../../ui-elements/Button";
import BrandColorTheme from "../../ui-elements/BrandColorTheme";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";
import EditImage from "../../ui-elements/EditImage";

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
const BrandSettings = () => {
  const classes = useStyles();
  const option = [
    { key: "option-1", value: "ind" },
    { key: "option-2", value: "rs" },
  ];
  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage />
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <Form>
          <Row form>
            <Col md={{ size: "7", offset: 3 }}>
              <FormGroup>
                <Input
                  type="text"
                  label="Brand Name"
                  placeholder="John"
                  height={"50px"}
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "7", offset: 3 }}>
              <FormGroup>
                <DorpDown
                  type="select"
                  options={option}
                  label="Currency"
                  height={"50px"}
                />
              </FormGroup>
            </Col>

            <Col md={{ size: "8", offset: 3 }}>
              <BrandColorTheme />
            </Col>

            <Col md={{ size: 7, offset: 3 }} className="text-center">
              <Button text="Save Changes" width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default BrandSettings;
