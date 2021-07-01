import { ErrorSharp } from "@material-ui/icons";
import {
  Container,
  Col,
  Row,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
const Units = ({ handleChange, errors }) => {
  return (
    <Container>
      <Row>
        <Col md="12 my-5">
          <b>Units</b>
        </Col>
        <Col md="6">
          Weight
          <Col md="6">
            <Row>
              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      value="KG"
                      onChange={handleChange("weightUnit")}
                      className="mr-4"
                      name="weightUnit"
                    />{" "}
                    KG
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      value="LBS"
                      onChange={handleChange("weightUnit")}
                      className="mr-4"
                      name="weightUnit"
                    />{" "}
                    LBS
                  </Label>
                </FormGroup>
              </FormGroup>
              {errors && errors.weightUnit && (
                <p style={{ color: "red" }}>{errors.weightUnit}</p>
              )}
            </Row>
          </Col>
        </Col>
        <Col md="6">
          Height
          <Col md="6">
            <Row>
              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      value="CM"
                      onChange={handleChange("heightUnit")}
                      className="mr-4"
                      name="heightUnit"
                    />{" "}
                    CM
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      value="LBS"
                      onChange={handleChange("heightUnit")}
                      className="mr-4"
                      name="heightUnit"
                    />{" "}
                    LBS
                  </Label>
                </FormGroup>
              </FormGroup>
              {errors && errors.heightUnit && (
                <p style={{ color: "red" }}>{errors.heightUnit}</p>
              )}
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Units;
