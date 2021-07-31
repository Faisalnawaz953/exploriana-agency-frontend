import React, { useState, useRef } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  CustomInput,
  Modal,
  ModalBody
} from "reactstrap";
import BackButton from "../../components/ui-elements/BackButton";
import Input from "../../components/ui-elements/Input";
import Tags from "../../components/ui-elements/Tags";
import ImageUpload from "../../components/ui-elements/ImageUpload";
import DorpDown from "../../components/ui-elements/DropDown";
import UploadedImage from "../../components/ui-elements/UploadedImage";
import Button from "../../components/ui-elements/Button";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import * as yup from "yup";
import RadioButton from "../../components/ui-elements/RadioButton";
import CustomCheckBox from "../../components/ui-elements/CustomCheckBox";
import { isEmpty, get, add } from "lodash";
import { addLiveClass, updateImage } from "../../dataServices/Services";
import { useAlert } from "react-alert";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import TextButton from "../../components/ui-elements/TextButton";
import LocationPopUp from "../../components/ui-elements/LocationPopUp";
import { width } from "@material-ui/system";
import { formatBytes } from "../../config/GlobalFunctions";

const livepersonSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  notes: yup.string().required("Notes is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Enter Price in numbers"),
  recur: yup.number().typeError("Enter Repeat week in Numbers"),
  startTime: yup.string().required("Enter Starting Time"),
  capacity: yup
    .number()
    .typeError("Enter Capacity in Numbers")
    .required("Capacit is required")
});

const liveClassSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  notes: yup.string().required("Notes is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Enter Price in numbers"),
  recur: yup.number().typeError("Enter Repeat week in Numbers"),
  startTime: yup.string().required("Enter Starting Time"),
  link: yup.string().required("Link is required")
});
const UploadLiveClass = props => {
  const [visibility, setVisibility] = useState("Draft");
  const [additional, setAdditional] = useState([]);
  const [trainer, setTrainer] = useState("Martin");
  const [length, setLength] = useState("15 minutes");
  const [date, setDate] = useState("");
  const locationRef = useRef();
  const [locations, setLocations] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();

  const alert = useAlert();

  const history = useHistory();
  const options = [
    { key: "option-1", value: " 15 minutes" },
    { key: "option-2", value: " 25 minutes" },
    { key: "option-3", value: " 35 minutes" },
    { key: "option-4", value: " 45 minutes" }
  ];
  const Trainer = [
    { key: "option-1", value: " Anna Martin" },
    { key: "option-2", value: " abc" },
    { key: "option-3", value: " xyz" },
    { key: "option-4", value: " abc xyz" }
  ];
  const type = [
    { key: "option-1", value: "Virtual" },
    { key: "option-1", value: "In-person" }
  ];

  const targetArea = [" Upper body", " Full body", " Core", " Lower body"];

  const FitnessGoal = [
    "Be more active",
    "Lose weight",
    "Stay toned",
    " Build muscle",
    "Reduce stress",
    "Improve flexibility",
    "Increase strength"
  ];
  const Type = ["Cardio", " Strength", "Calm"];
  const [selectedTargetArea, setSelectedTargetArea] = useState([]);
  const [selectedFitnessGoal, setSelectedFitnessGoal] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [liveType, setLiveType] = useState("Virtual");
  const [loading, setLoading] = useState();
  const [repeatValue, setRepeatValue] = useState([]);
  const [imageSize, setImageSize] = useState("");
  const [imageName, setImageName] = useState("");
  const [loadingImage, setLoadingImage] = React.useState(false);

  const toggleLocationPopUp = () => {
    if (locationRef.current.style.display === "flex") {
      locationRef.current.style.display = "none";
    } else {
      locationRef.current.style.display = "flex";
    }
  };

  const uploadCoverImage = async acceptedFiles => {
    setLoadingImage(true);
    const size = formatBytes(acceptedFiles[0].size);
    setImageSize(size);
    setImageName(acceptedFiles[0].name);
    let url = URL.createObjectURL(acceptedFiles[0]);

    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingImage(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoadingImage(false);
      setCoverImage(res.data.imageUrl);
      alert.success("Cover Image Added");
    }
  };

  const uploadLiveClass = async values => {
    setLoading(true);
    const imageDetails = {
      name: imageName,
      size: imageSize
    };
    const data = {
      title: values.title,
      description: values.description,
      maxLength: length,
      trainer: trainer,
      price: values.price,
      type: liveType,
      notes: values.notes,
      targetArea: selectedTargetArea[0],
      fitnessGoal: selectedFitnessGoal[0],
      visibility: visibility,
      coverImage: coverImage,
      additional: additional,
      fitnessType: selectedType[0],
      recur: values.recur,
      link: values.link,
      startTime: values.startTime,
      date: date,
      location: selectedLocation,
      capacity: values.capacity,
      imageDetails: imageDetails
    };
    const res = await addLiveClass(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      values.title = "";
      values.price = "";
      values.description = "";
      values.notes = "";
      values.recur = "";
      values.startTime = "";
      values.link = "";
      setAdditional([]);
      setClicked(false);
      setCoverImage("");
      values.capacity = "";
      setSelectedLocation();
      setDate("");
      setSelectedFitnessGoal([]);
      setSelectedTargetArea([]);
      setSelectedType([]);
      setLoading(false);
      alert.success("Class Added Successfully.");
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        notes: "",
        price: "",
        link: "",
        recur: "",
        startTime: "",
        date: "",
        capacity: ""
      }}
      validationSchema={
        liveType === "Virtual" ? liveClassSchema : livepersonSchema
      }
      onSubmit={values => {
        if (
          isEmpty(selectedType) ||
          isEmpty(selectedFitnessGoal) ||
          isEmpty(selectedTargetArea) ||
          coverImage === "" ||
          (!isEmpty(repeatValue) && values.recur === "") ||
          (!selectedLocation && liveType === "In-person")
        ) {
          setClicked(true);
        } else {
          uploadLiveClass(values);
        }
      }}
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
            <BackButton
              title="Back to classes"
              onClick={() => history.push("/live")}
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
                        <Input
                          type="textarea"
                          label="Description "
                          color="white"
                          height="80px"
                          placeholder="Details about your Class"
                          backgroundColor
                          value={values.description}
                          onBlur={handleBlur("description")}
                          onChange={handleChange("description")}
                          touched={touched.description}
                          errors={errors.description}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <DorpDown
                          type="select"
                          label="Max length"
                          color="white"
                          height="50px"
                          backgroundColor
                          options={options}
                          value={length}
                          setValue={setLength}
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
                          backgroundColor
                          value={trainer}
                          setValue={setTrainer}
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
                          value={values.price}
                          onBlur={handleBlur("price")}
                          onChange={handleChange("price")}
                          touched={touched.price}
                          errors={errors.price}
                        />
                      </Col>

                      <Col md={{ size: 4, offset: 2 }}>
                        <Input
                          label="Date"
                          type="date"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={date}
                          onChange={setDate}
                        />
                        {clicked && date === "" && (
                          <div className="text-danger">
                            Enter Date For Class
                          </div>
                        )}
                      </Col>
                      <Col md={{ size: 4 }}>
                        <Input
                          label="Start Time"
                          type="time"
                          placeholder="Details about your Class"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={values.startTime}
                          onBlur={handleBlur("startTime")}
                          onChange={handleChange("startTime")}
                          touched={touched.startTime}
                          errors={errors.startTime}
                        />
                      </Col>

                      {/* <Col md={{ size: 0 }} className="mt-4">
                        <AttachMoneyIcon />
                    </Col> */}
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          repeatValue={repeatValue}
                          setRepeatValue={setRepeatValue}
                          repeat
                          label="Repeat class "
                          type="text"
                          placeholder="Week"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={values.recur}
                          onBlur={handleBlur("recur")}
                          onChange={handleChange("recur")}
                          touched={touched.recur}
                          errors={errors.recur}
                        />

                        {clicked &&
                          values.recur === "" &&
                          repeatValue.includes("repeat") && (
                            <div
                              className="text-danger"
                              style={{ marginTop: -20 }}
                            >
                              Enter Repeating Weeks
                            </div>
                          )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <DorpDown
                          label="Type"
                          type="select"
                          placeholder="1234"
                          color="white"
                          height="50px"
                          backgroundColor
                          options={type}
                          setValue={setLiveType}
                          value={liveType}
                        />
                      </Col>
                      {liveType === "In-person" && (
                        <>
                          <Col md={{ size: 8, offset: 2 }}>
                            <DorpDown
                              label="Location"
                              type="select"
                              color="white"
                              height="50px"
                              backgroundColor
                              options={locationsList}
                              value={selectedLocation && selectedLocation.name}
                              setValue={val => {
                                let loca = locations.filter(
                                  loc => loc.name === val
                                );
                                setSelectedLocation(loca[0]);
                              }}
                            />

                            {clicked && !selectedLocation && (
                              <div className="text-danger">
                                Location is required
                              </div>
                            )}
                          </Col>
                          <Col
                            md={{ size: 8, offset: 2 }}
                            className="d-flex justify-content-end"
                          >
                            <TextButton
                              label="+ Add Location"
                              onClick={toggleLocationPopUp}
                            />
                          </Col>
                          <Col md={{ size: 8, offset: 2 }}>
                            <div
                              className=" justify-content-end"
                              style={{
                                display: "none",
                                width: "100%",
                                position: "absolute",
                                zIndex: 9
                              }}
                              ref={locationRef}
                            >
                              <LocationPopUp
                                locations={locations}
                                setLocations={setLocations}
                                locationsList={locationsList}
                                setLocationsList={setLocationsList}
                                toggle={toggleLocationPopUp}
                              />
                              {/* <ClassesPopup toggle={toggleClassPopUp} /> */}
                            </div>
                          </Col>
                          <Col md={{ size: 8, offset: 2 }}>
                            <Input
                              label="Capacity "
                              type="text"
                              placeholder="10"
                              color="white"
                              height="50px"
                              backgroundColor
                              value={values.capacity}
                              onBlur={handleBlur("capacity")}
                              onChange={handleChange("capacity")}
                              touched={touched.capacity}
                              errors={errors.capacity}
                            />
                          </Col>
                        </>
                      )}
                      {liveType === "Virtual" && (
                        <Col md={{ size: 8, offset: 2 }}>
                          <Input
                            label="Link "
                            type="text"
                            placeholder="Url Link"
                            color="white"
                            height="50px"
                            backgroundColor
                            value={values.link}
                            onBlur={handleBlur("link")}
                            onChange={handleChange("link")}
                            touched={touched.link}
                            errors={errors.link}
                          />
                        </Col>
                      )}
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Notes (optional)"
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
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Upload Image"
                          setSelectedFiles={uploadCoverImage}
                          loadingFile={loadingImage}
                        />
                        {coverImage !== "" && (
                          <UploadedImage
                            url={coverImage}
                            name={imageName}
                            size={imageSize}
                          />
                        )}
                        {clicked && coverImage === "" && (
                          <div className="text-danger">
                            Cover Image is required
                          </div>
                        )}
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
                        {clicked && isEmpty(selectedTargetArea) && (
                          <div className="text-danger">
                            Select at least Target Area
                          </div>
                        )}
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
                        {clicked && isEmpty(selectedFitnessGoal) && (
                          <div className="text-danger">
                            Select at least one Fitness Goal
                          </div>
                        )}
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
                        {clicked && isEmpty(selectedType) && (
                          <div className="text-danger">
                            Select at least one Type
                          </div>
                        )}
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
                            showLabel
                            setValue={setAdditional}
                          />
                        </Row>
                      </Col>
                    </>
                  )}{" "}
                  <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
                    <Button
                      text={"Upload Live Class"}
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

export default UploadLiveClass;
