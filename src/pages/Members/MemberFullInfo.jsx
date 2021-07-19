import React from "react";
import ProfilePic from "../../assets/images/Ellipse.png";
import { Container, Row, Col, FormGroup, Form } from "reactstrap";
import Input from "../../components/ui-elements/Input";
import DorpDown from "../../components/ui-elements/DropDown";
import Button from "../../components/ui-elements/Button";
import { useHistory } from "react-router-dom";
import BackButton from "../../components/ui-elements/BackButton";

const MemberFullInfo = () => {
  const history = useHistory();
  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" }
  ];
  return (
    <>
      <BackButton
        title="Back to members"
        onClick={() => history.push("/members")}
      />
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <img src={ProfilePic} alt="" srcset="" />
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
                  height={"50px"}
                  label="Gender"
                  options={option}
                  type="select"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4", offset: 2 }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  type="text"
                  label="Fitness goal"
                  placeholder="Be more active"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4" }}>
              <FormGroup>
                <Input
                  placeholder="Email@mail.com"
                  height={"50px"}
                  label="Email"
                  options={option}
                  type="email"
                />
              </FormGroup>
            </Col>{" "}
            <Col md={{ size: "4", offset: 2 }}>
              <FormGroup>
                <Input
                  height={"50px"}
                  type="text"
                  label="Weight"
                  placeholder="97"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: "4" }}>
              <FormGroup>
                <Input
                  placeholder="187"
                  height={"50px"}
                  label="Height"
                  options={option}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="text-center">
              <Button text="Message" width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default MemberFullInfo;
