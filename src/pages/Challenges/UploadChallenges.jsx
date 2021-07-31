import React, { useRef } from "react";
import { Container, Form, Col, Row } from "reactstrap";
import BackButton from "../../components/ui-elements/BackButton";
import { useHistory } from "react-router-dom";
import Input from "../../components/ui-elements/Input";
import ImageUpload from "../../components/ui-elements/ImageUpload";
import Button from "../../components/ui-elements/Button";
import { useAlert } from "react-alert";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import get from "lodash/get";
import UploadedImage from "../../components/ui-elements/UploadedImage";
import TextButton from "../../components/ui-elements/TextButton";
import VideosPopup from "../../components/ui-elements/VideosPopup";
import ClassesPopup from "../../components/ui-elements/ClassesPopUp";
import { Formik } from "formik";
import * as yup from "yup";
import { addChallange } from "../../dataServices/Services";
import { formatBytes } from "../../config/GlobalFunctions";
import { getClassrooms, getVideos } from "../../redux/selectors";
import { connect } from "react-redux";

const uploadChallangeSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  price: yup
    .number()
    .required("Price is Required.")
    .typeError("Enter Price in Numbers."),
  description: yup.string().required("Description is required."),
  notes: yup.string().required("Required")
});

const UploadChallenges = ({ classrooms, videos }) => {
  console.log(classrooms);
  const history = useHistory();
  const videoRef = useRef();
  const classRef = useRef();
  const alert = useAlert();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [file, setFile] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [workoutVideos, setWorkoutVideos] = React.useState([]);
  const [workoutClasses, setWorkoutClasses] = React.useState([]);
  const [imageSize, setImageSize] = React.useState("");
  const [imageName, setImageName] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");

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
  const imageUpload = async acceptedFiles => {
    const size = formatBytes(acceptedFiles[0].size);
    setImageSize(size);
    setImageName(acceptedFiles[0].name);
    let url = URL.createObjectURL(acceptedFiles[0]);
    setCoverImage(url);
    let blob = await fetch(url).then(r => r.blob());

    setFile(blob);
  };
  const addNewChallenge = async values => {
    setLoading(true);

    let workouts = {
      videos: workoutVideos,
      classes: workoutClasses
    };
    const imageDetails = {
      name: imageName,
      size: imageSize
    };

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", file);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("notes", values.notes);
    formData.append("price", values.price);
    formData.append("workouts", JSON.stringify(workouts));
    formData.append("imageDetails", JSON.stringify(imageDetails));

    const res = await addChallange(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);
      values.title = "";
      setWorkoutClasses([]);
      setWorkoutVideos([]);
      setEndDate("");
      setStartDate("");
      setFile();
      values.notes = "";
      values.description = "";
      values.price = "";

      alert.success("Challenge Added SuccessFully");
    }
  };

  return (
    <Formik
      initialValues={{ title: "", description: "", notes: "", price: "" }}
      validationSchema={uploadChallangeSchema}
      onSubmit={addNewChallenge}
    >
      {props => {
        const {
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit
        } = props;
        return (
          <>
            {" "}
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
                  {loading ? (
                    <Col
                      md={{ size: "8", offset: 2 }}
                      style={{ height: "400px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <ApiLoader />
                    </Col>
                  ) : (
                    <>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Title"
                          color="white"
                          height="50px"
                          placeholder="Enter your Class Name"
                          backgroundColor
                          value={values.title}
                          onBlur={handleBlur("title")}
                          onChange={handleChange("title")}
                          touched={touched.title}
                          errors={errors.title}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Image"
                          setSelectedFiles={imageUpload}
                        />
                        {file && (
                          <UploadedImage
                            url={coverImage}
                            name={imageName}
                            size={imageSize}
                          />
                        )}
                      </Col>
                      <Col md={{ size: 4, offset: 2 }}>
                        <Input
                          label="Start"
                          type="date"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={startDate}
                          onChange={setStartDate}
                        />
                      </Col>
                      <Col md={{ size: 4 }}>
                        <Input
                          label="End"
                          type="date"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={endDate}
                          onChange={setEndDate}
                          min={startDate}
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
                          value={values.price}
                          onBlur={handleBlur("price")}
                          onChange={handleChange("price")}
                          touched={touched.price}
                          errors={errors.price}
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
                          value={values.description}
                          onBlur={handleBlur("description")}
                          onChange={handleChange("description")}
                          touched={touched.description}
                          errors={errors.description}
                        />
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Workouts</b>
                        {workoutClasses.map(cl => (
                          <UploadedImage
                            key={cl}
                            name={classrooms.map(classroom => {
                              if (classroom._id === cl) {
                                return classroom.videoDetails.name;
                              }
                            })}
                            size={classrooms.map(classroom => {
                              if (classroom._id === cl) {
                                return classroom.videoDetails.size;
                              }
                            })}
                            url={classrooms.map(classroom => {
                              if (classroom._id === cl) {
                                return classroom.coverImage;
                              }
                            })}
                          />
                        ))}
                        {workoutVideos.map(vid => (
                          <UploadedImage
                            name={videos.map(video => {
                              if (video._id === vid) {
                                return video.videoDetails.name;
                              }
                            })}
                            size={videos.map(video => {
                              if (video._id === vid) {
                                return video.videoDetails.size;
                              }
                            })}
                            url={videos.map(video => {
                              if (video._id === vid) {
                                return video.coverImage;
                              }
                            })}
                            key={vid}
                          />
                        ))}
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
                        <TextButton
                          label="+ Add Video"
                          onClick={toggleVideoPopUp}
                        />
                        <div
                          style={{
                            display: "none",

                            top: 13,
                            right: 90,
                            zIndex: 9,
                            position: "absolute"
                          }}
                          ref={classRef}
                        >
                          <ClassesPopup
                            workoutClasses={workoutClasses}
                            setWorkoutClasses={setWorkoutClasses}
                            toggle={toggleClassPopUp}
                          />
                        </div>
                        <div
                          style={{
                            display: "none",

                            top: 13,
                            right: -2,
                            zIndex: 9,
                            position: "absolute"
                          }}
                          ref={videoRef}
                        >
                          <VideosPopup
                            workoutVideos={workoutVideos}
                            setWorkoutVideos={setWorkoutVideos}
                            toggle={toggleVideoPopUp}
                          />
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
                          value={values.notes}
                          onBlur={handleBlur("notes")}
                          onChange={handleChange("notes")}
                          touched={touched.notes}
                          errors={errors.notes}
                        />
                      </Col>
                    </>
                  )}

                  <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
                    <Button
                      text={"Add Challenge"}
                      width="100%"
                      height="2.5rem"
                      onClick={handleSubmit}
                    />
                  </Col>
                </Row>
              </Form>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    classrooms: getClassrooms(state),
    videos: getVideos(state)
  };
};

export default connect(mapStateToProps, null)(UploadChallenges);
