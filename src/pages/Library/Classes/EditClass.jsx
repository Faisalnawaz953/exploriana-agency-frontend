import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CustomInput,
  Label
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
import { Formik } from "formik";
import * as yup from "yup";
import { isEmpty, get, add } from "lodash";
import {
  updateImage,
  updateUserClassRoom
} from "../../../dataServices/Services";
import { useAlert } from "react-alert";
import { addClassRoom } from "../../../dataServices/Services";
import ApiLoader from "../../../components/ui-elements/ApiLoader";
import { getClassrooms } from "../../../redux/selectors";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const classSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  notes: yup.string().required("Notes is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Enter Price in numbers")
});
const EditClass = ({ classes }) => {
  const { id } = useParams();
  const alert = useAlert();
  const [clicked, setClicked] = useState(false);
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
  const [categoryTags, setCategoryTags] = useState(["HIT", "YOGA"]);
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
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [visibility, setVisibility] = useState("Draft");
  const [additional, setAdditional] = useState([]);
  const [trainer, setTrainer] = useState("Martin");
  const [coverImage, setCoverImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState();
  const [length, setLength] = useState();
  const [classroom, setClassRoom] = useState();

  const getSingleClass = () => {
    if (!isEmpty(classes)) {
      let singleClass = classes.filter(video => video._id === id);
      setClassRoom(singleClass[0]);
      let cat = [...selectedCategory];
      cat.push(singleClass[0].category);
      setSelectedCategory(cat);
      setLength(singleClass[0].maxLength);
      setVisibility(singleClass[0].visibility);
      setVideo(singleClass[0].videoURL);
      setCoverImage(singleClass[0].coverImage);
      let fitType = [...selectedType];
      fitType.push(singleClass[0].type);
      setSelectedType(fitType);
      let tarea = [...selectedTargetArea];
      tarea.push(singleClass[0].targetArea);
      setSelectedTargetArea(tarea);
      let fgoal = [...selectedFitnessGoal];
      fgoal.push(singleClass[0].fitnessGoal);
      setSelectedFitnessGoal(fgoal);
      setAdditional(singleClass[0].additional);
    } else {
      alert.error("Error.Network Error or No Class exist.");
    }
  };

  const uploadCoverImage = async acceptedFiles => {
    let url = URL.createObjectURL(acceptedFiles[0]);

    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setCoverImage(res.data.imageUrl);
      alert.success("Cover Image Added");
    }
  };

  const videoUpload = async acceptedFiles => {
    let url = URL.createObjectURL(acceptedFiles[0]);

    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setVideo(res.data.imageUrl);
      alert.success("Video Added");
    }
  };

  const updateClass = async values => {
    setLoading(true);
    const data = {
      title: values.title,
      description: values.description,
      maxLength: length,
      trainer: trainer,
      price: values.price,
      videoURL: video,
      type: selectedType[0],
      category: selectedCategory[0],
      notes: values.notes,
      targetArea: selectedTargetArea[0],
      fitnessGoal: selectedFitnessGoal[0],
      visibility: visibility,
      coverImage: coverImage,
      additional: additional
    };
    const res = await updateUserClassRoom(id, data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);
      alert.success("Class Added Successfully.");
    }
  };

  React.useEffect(() => {
    getSingleClass();
  }, []);
  return (
    <Formik
      initialValues={{
        title: classroom && classroom.title,
        description: classroom && classroom.description,
        notes: classroom && classroom.notes,
        price: classroom && classroom.price
      }}
      enableReinitialize={true}
      validationSchema={classSchema}
      onSubmit={values => {
        if (
          isEmpty(selectedType) ||
          isEmpty(selectedCategory) ||
          isEmpty(selectedFitnessGoal) ||
          isEmpty(selectedTargetArea) ||
          coverImage === "" ||
          video === ""
        ) {
          setClicked(true);
        } else {
          updateClass(values);
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
              onClick={() => history.push("/classes")}
            />
            <Container className="text-center">
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <h3>Edit Class</h3>
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
                        <Input
                          label="Description"
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
                        <DorpDown
                          label="Max length"
                          type="select"
                          placeholder="Details about your Class"
                          color="white"
                          height="50px"
                          options={options}
                          backgroundColor
                          value={length}
                          setValue={setLength}
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
                          value={trainer}
                          setValue={setTrainer}
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
                          value={values.price}
                          onBlur={handleBlur("price")}
                          onChange={handleChange("price")}
                          touched={touched.price}
                          errors={errors.price}
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
                          setTags={setCategoryTags}
                          newTag
                        />
                        {clicked && isEmpty(selectedCategory) && (
                          <div className="text-danger">
                            Select at least one Category
                          </div>
                        )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          type="textarea"
                          label={`Notes`}
                          color="white "
                          placeholder="Enter Notes"
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
                          text="Video file"
                          setSelectedFiles={videoUpload}
                          video
                        />
                        {clicked && video === "" && (
                          <div className="text-danger">Video is required</div>
                        )}
                        {video !== "" && <UploadedImage />}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Cover image"
                          setSelectedFiles={uploadCoverImage}
                        />
                        {coverImage !== "" && <UploadedImage />}
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
                  )}

                  <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
                    <Button
                      text={"Save Changes"}
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
    classes: getClassrooms(state)
  };
};

export default connect(mapStateToProps, null)(EditClass);
