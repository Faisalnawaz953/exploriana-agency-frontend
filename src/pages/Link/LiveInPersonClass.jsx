import { useState } from "react";
import { Container, Row, Col, Form, CustomInput } from "reactstrap";
import BackButton from "../../components/ui-elements/BackButton";
import Input from "../../components/ui-elements/Input";
import Tags from "../../components/ui-elements/Tags";
import ImageUpload from "../../components/ui-elements/ImageUpload";
import DorpDown from "../../components/ui-elements/DropDown";
import UploadedImage from "../../components/ui-elements/UploadedImage";
import Button from "../../components/ui-elements/Button";
import { useHistory } from "react-router-dom";

const LiveInPersonClass = () => {
  const history = useHistory();
  const options = [
    { key: "option-1", value: " 15 minutes" },
    { key: "option-2", value: " 25 minutes" },
    { key: "option-3", value: " 35 minutes" },
    { key: "option-4", value: " 45 minutes" },
  ];
  const Trainer = [
    { key: "option-1", value: " Anna Martin" },
    { key: "option-2", value: " abc" },
    { key: "option-3", value: " xyz" },
    { key: "option-4", value: " abc xyz" },
  ];
  const type = [
    { key: "option-1", value: "Virtual" },
    { key: "option-1", value: "Non-Virtual" },
  ];
  const type1 = [
    { key: "option-1", value: "In-Person" },
    { key: "option-1", value: "xyz" },
    { key: "option-1", value: "abc" },
    { key: "option-1", value: "abcxyz" },
  ];
  const tags = [
    { id: "1", tag: " + New" },
    { id: "2", tag: " HIT" },
    { id: "3", tag: " YOGA" },
  ];
  const targetArea = [
    { id: "1", tag: " Upper body" },
    { id: "2", tag: " Full body" },
    { id: "3", tag: " Core" },
    { id: "4", tag: " Lower body" },
  ];
  const FitnessGoal = [
    { id: "1", tag: " Be more active" },
    { id: "2", tag: " Lose weight" },
    { id: "3", tag: " Stay toned" },
    { id: "4", tag: " Build muscle" },
    { id: "5", tag: " Reduce stress" },
    { id: "6", tag: " Improve flexibility" },
    { id: "7", tag: " Increase strength" },
  ];
  const Type = [
    { id: "1", tag: " Cardio    " },
    { id: "2", tag: " Strength" },
    { id: "3", tag: " Calm" },
  ];
  const Locations = [
    { id: "1", value: "Pure Fitness" },
    { id: "2", value: "abc" },
    { id: "3", value: "xyz" },
  ];

  return (
    <>
      <BackButton
        title="Back to classes"
        onClick={() => history.push("/challenges")}
      />

      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <h3>
                <b>Create Live Class</b>
              </h3>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <Form className="  my-5">
          <Row form className="  mb-5">
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Title"
                color="white"
                height="50px"
                placeholder="Enter your Class Name"
                backgroundColor
              />
              <Input
                type="textarea"
                label="Description"
                color="white"
                height="80px"
                placeholder="Details about your Class"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <DorpDown
                type="select"
                label="Max length"
                color="white"
                height="50px"
                placeholder="Enter your Class Name"
                backgroundColor
                options={options}
              />
            </Col>
            <Col md={{ size: 4, offset: 2 }}>
              <DorpDown
                type="select"
                label="Trainer"
                type="select"
                color="white"
                height="50px"
                options={Trainer}
              />
            </Col>

            <Col md={{ size: 4 }}>
              <Input
                label="price"
                type="text"
                placeholder="1234"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>

            <Col md={{ size: 4, offset: 2 }}>
              <Input
                label="Date"
                type="date"
                placeholder="Details about your Class"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 4 }}>
              <Input
                label="Start Time"
                type="time"
                placeholder="Details about your Class"
                color="white"
                height="50px"
                backgroundColor
              />
              <div className="text-right">+ Add Schedule</div>
            </Col>

            {/* <Col md={{ size: 0 }} className="mt-4">
                    <AttachMoneyIcon />
                </Col> */}
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Recur class "
                type="text"
                placeholder="Week"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <DorpDown
                label="Type "
                type="select"
                placeholder="Week"
                color="white"
                height="50px"
                backgroundColor
                options={type1}
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <DorpDown
                label="Location"
                type="select"
                color="white"
                height="50px"
                backgroundColor
                options={Locations}
              />
              <div className="text-right">+ Add Location</div>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Link "
                type="text"
                placeholder="Url Link"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Capacity "
                type="text"
                placeholder="10"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Notes (optional)"
                type="textarea"
                placeholder="Enter Notes"
                color="white"
                height="80px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Upload Image" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <UploadedImage />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Target area</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags tags={targetArea} />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Fitness goal</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags tags={FitnessGoal} />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Type</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags tags={Type} />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Visibility</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mt-3">
              <Row>
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio"
                  name="customRadio"
                  className="mr-3"
                  label="Draft"
                />
                <CustomInput
                  type="radio"
                  id="exampleCustomRadio2"
                  name="customRadio"
                  label="OPublish"
                />
              </Row>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Aditional</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mt-3">
              <Row>
                <CustomInput
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  label="Featured"
                />
              </Row>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
              <Button text={"Upload Class"} width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default LiveInPersonClass;
