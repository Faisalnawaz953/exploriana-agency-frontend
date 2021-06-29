import React, { useRef } from "react";
import { Container, Form, Col, Row } from "reactstrap";
import BackButton from "../../components/ui-elements/BackButton";
import { useHistory } from "react-router-dom";
import Input from "../../components/ui-elements/Input";
import ImageUpload from "../../components/ui-elements/ImageUpload";
import Button from "../../components/ui-elements/Button";
import UploadedImage from "../../components/ui-elements/UploadedImage";
import TextButton from "../../components/ui-elements/TextButton";
import VideosPopup from "../../components/ui-elements/VideosPopup";
import ClassesPopup from "../../components/ui-elements/ClassesPopUp";

const UploadChallenges = () => {
  const history = useHistory();
  const videoRef = useRef();
  const classRef = useRef();
  const toggleVideoPopUp = () => {
    if (videoRef.current.style.display === "block") {
      videoRef.current.style.display = "none";
    } else {
      videoRef.current.style.display = "block";
      classRef.current.style.display = "none";
    }
  };
  const toggleClassPopUp = () => {
    if (classRef.current.style.display === "block") {
      classRef.current.style.display = "none";
    } else {
      classRef.current.style.display = "block";
      videoRef.current.style.display = "none";
    }
  };
  return (
    <>
      <BackButton
        title="Back to Challenges"
        onClick={() => history.push("/challenges")}
      />
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <h3>
                <b>Add New Challenge</b>
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
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <ImageUpload text="Video file" />
            </Col>
            <Col md={{ size: 4, offset: 2 }}>
              <Input
                label="Start"
                type="date"
                placeholder="Details about your Class"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 4 }}>
              <Input
                label="Start"
                type="date"
                placeholder="Details about your Class"
                color="white"
                height="50px"
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
                placeholder="1234"
                color="white"
                height="50px"
                backgroundColor
              />
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Description "
                type="textarea"
                placeholder="Details about your Class"
                color="white"
                height="80px"
                backgroundColor
              />
            </Col>

            <Col md={{ size: 8, offset: 2 }}>
              <b>Workouts</b>
            </Col>

            <Col md={{ size: 8, offset: 2 }}>
              <UploadedImage />
              <UploadedImage />
            </Col>
            <Col
              md={{ size: 8, offset: 2 }}
              className="d-flex justify-content-end"
              style={{ position: "relative" }}
            >
              <TextButton
                label="+ Add Class"
                onClick={toggleClassPopUp}
                marginRight="20px"
              />
              <TextButton label="+ Add Video" onClick={toggleVideoPopUp} />
              <div
                style={{
                  display: "none",

                  top: 13,
                  right: 90,
                  zIndex: 9,
                  position: "absolute",
                }}
                ref={classRef}
              >
                <ClassesPopup toggle={toggleClassPopUp} />
              </div>
              <div
                style={{
                  display: "none",

                  top: 13,
                  right: -2,
                  zIndex: 9,
                  position: "absolute",
                }}
                ref={videoRef}
              >
                <VideosPopup toggle={toggleVideoPopUp} />
              </div>
            </Col>

            <Col md={{ size: 8, offset: 2 }}>
              <Input
                label="Notes(optional) "
                type="textarea"
                placeholder="Enter Notes"
                color="white"
                height="80px"
                backgroundColor
              />
            </Col>

            <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
              <Button text={"Add Challenge"} width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UploadChallenges;
