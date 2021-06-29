import { Container, Row, Col, Form, CustomInput } from "reactstrap";

import ImageUpload from "../../ui-elements/ImageUpload";
import Input from "../../ui-elements/Input";
import Button from "../../ui-elements/Button";
import RadioButton from "../../ui-elements/RadioButton";

const LandingPage = () => {
  return (
    <>
      <Container className="text-center my-5">
        <Form>
          <Row className="my-5">
            <Col md={{ size: 12 }}>
              <h1>Landing Page</h1>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Form className="  my-5">
          <Row form className="  mb-5">
            <Col md={{ size: 8, offset: 2 }}>
              <b>Hero:</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Cover image" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input label="Title" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input label="Description" type="textarea" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Trailer video(optional)" />
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mt-4 mb-4 h6">
              <b>Access:</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Cover image" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input label="Title" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input label="Description" type="textarea" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <p>
                <b>Review</b>
              </p>
              <Row form>
                <RadioButton label="Show" />
                <RadioButton label="Hide" />
              </Row>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <p>
                <b>Membership</b>
              </p>
              <Row form>
                <RadioButton label="Show" />
                <RadioButton label="Hide" />
              </Row>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mb-5">
              <Button text={"Save"} width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default LandingPage;
