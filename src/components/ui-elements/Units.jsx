import { Container, Col, Row, CustomInput, Form } from "reactstrap";
const Units = () => {
  return (
    <Container>
      <Row>
        <Col md="12 my-5">
          <b>Units</b>
        </Col>
        <Col md="6">
          Weight
          <Col md="6">
            <Row form>
              <CustomInput
                className="mr-4"
                type="radio"
                id="exampleCustomRadio"
                label="kG"
              />
              <CustomInput type="radio" id="exampleCustomRadio2" label="LBS" />
            </Row>
          </Col>
        </Col>
        <Col md="6">
          height
          <Col md="6">
            <Row form>
              <CustomInput
                className="mr-4"
                type="radio"
                id="exampleCustomRadio3"
                label="CM"
              />
              <CustomInput type="radio" id="exampleCustomRadio4" label="LBS" />
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Units;
