import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CustomInput,
  Label,
} from "reactstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Input from "../../../components/ui-elements/Input";
import ImageUpload from "../../../components/ui-elements/ImageUpload";
import DorpDown from "../../../components/ui-elements/DropDown";
import Button from "../../../components/ui-elements/Button";
import Tags from "../../../components/ui-elements/Tags";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BackButton from "../../../components/ui-elements/BackButton";
import { useHistory } from "react-router-dom";
import UploadedImage from "../../../components/ui-elements/UploadedImage";
import { SelectAllTwoTone } from "@material-ui/icons";
import RadioButton from "../../../components/ui-elements/RadioButton";
import CustomCheckBox from "../../../components/ui-elements/CustomCheckBox";

const UploadClasses = () => {
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
  const categoryTags = ["+ New", "HIT", "YOGA"];
  const targetArea = [" Upper body", " Full body", " Core", " Lower body"];

  const FitnessGoal = [
    "Be more active",
    "Lose weight",
    "Stay toned",
    " Build muscle",
    "Reduce stress",
    "Improve flexibility",
    "Increase strength",
  ];
  const Type = ["Cardio", " Strength", "Calm"];
  const [selectedTargetArea, setSelectedTargetArea] = useState([]);
  const [selectedFitnessGoal, setSelectedFitnessGoal] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [visibility, setVisibility] = useState("Draft");
  const [additional, setAdditional] = useState([]);

  return (
    <>
      <BackButton
        title="Back to classes"
        onClick={() => history.push("/classes")}
      />
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <h3>Upload Class</h3>
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
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Description"
                type="textarea"
                placeholder="Details about your Class"
                color="white"
                height="80px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <DorpDown
                label="Max length"
                type="select"
                placeholder="Details about your Class"
                color="white"
                height="50px"
                options={options}
                backgroundColor
              />
            </Col>
            <Col md={{ size: 4, offset: 2 }}>
              <DorpDown
                label="Trainer"
                type="select"
                color="white"
                height="50px"
                options={Trainer}
                backgroundColor
              />
            </Col>
            {/* <Col md={{ size: 0 }} className="mt-4">
                            <AttachMoneyIcon />
                        </Col> */}
            <Col md={{ size: 4 }}>
              <Input
                label="Price "
                type="text"
                placeholder="1234"
                color="white"
                height="50px"
                backgroundColor
                currency
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Category</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags
                tags={categoryTags}
                selectedTags={selectedCategory}
                setSelectedTags={setSelectedCategory}
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                type="textarea"
                label={`Notes`}
                color="white "
                placeholder="Enter Notes"
                height="80px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Video file" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <UploadedImage />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Cover image" />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <UploadedImage />
            </Col>

            <Col md={{ size: 8, offset: 2 }}>
              <b>Target area</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags
                tags={targetArea}
                selectedTags={selectedTargetArea}
                setSelectedTags={setSelectedTargetArea}
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Fitness goal</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags
                tags={FitnessGoal}
                selectedTags={selectedFitnessGoal}
                setSelectedTags={setSelectedFitnessGoal}
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Type</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Tags
                tags={Type}
                selectedTags={selectedType}
                setSelectedTags={setSelectedType}
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Visibility</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mt-3">
              <Row className="pl-3">
                <RadioButton
                  label="Draft"
                  value={visibility}
                  setValue={setVisibility}
                />
                <RadioButton
                  label="Publish"
                  value={visibility}
                  setValue={setVisibility}
                />
              </Row>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <b>Aditional</b>
            </Col>
            <Col md={{ size: 8, offset: 2 }} className="mt-3">
              <Row>
                <CustomCheckBox
                  label="Featured"
                  value={additional}
                  setValue={setAdditional}
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

export default UploadClasses;
