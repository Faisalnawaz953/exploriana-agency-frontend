import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CustomInput,
  Label,
} from "reactstrap";
import Input from "../../../components/ui-elements/Input";
import ImageUpload from "../../../components/ui-elements/ImageUpload";
import DorpDown from "../../../components/ui-elements/DorpDown";
import Button from "../../../components/ui-elements/Button";
import React, { useState } from "react";
import Tags from "../../../components/ui-elements/Tags";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BackButton from "../../../components/ui-elements/BackButton";
import { useHistory } from "react-router-dom";
import UploadedImage from "../../../components/ui-elements/UploadedImage";

const UploadVideos = () => {
  const history = useHistory();
  const categoryTags = [" + New", "TALKS", "Nutrition"];

  const [selectedCategory, setSelectedCategory] = useState([]);
  return (
    <>
      <BackButton
        title="Back to videos"
        onClick={() => history.push("/videos")}
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

            {/* <Col md={{ size: 0 }} className="mt-4">
                            <AttachMoneyIcon />
                        </Col> */}
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Price "
                type="text"
                placeholder="Details about your Class"
                color="white"
                height="50px"
                backgroundColor
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
                  label="Publish"
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

export default UploadVideos;
