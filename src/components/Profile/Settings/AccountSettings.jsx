import React from "react";
import { Container, Row, Col, FormGroup, Label, Form } from "reactstrap";
import ProfilePic from "../../../assets/images/Ellipse 122.png";
import Input from "../../ui-elements/Input";
import DropDown from "../../ui-elements/DropDown";
import ImageUpload from "../../ui-elements/ImageUpload";
import Button from "../../ui-elements/Button";
import get from "lodash/get";
import EditImage from "../../ui-elements/EditImage";
import { Edit } from "react-feather";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";
import { Formik } from "formik";
import { useAlert } from "react-alert";
import * as yup from "yup";
import {
  updateProfileImage,
  updateProfile
} from "../../../dataServices/Services";
import RadioButton from "../../ui-elements/RadioButton";
import ApiLoader from "../../ui-elements/ApiLoader";
import UploadedImage from "../../ui-elements/UploadedImage";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/actions/userActions/userActions";
import { formatBytes } from "../../../config/GlobalFunctions";
import UploadedVideo from "../../ui-elements/UploadedVideo";

const useStyles = makeStyles(theme => ({
  headText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    /* identical to box height, or 150% */

    letterSpacing: "0.6px",

    color: "#2B2B2B"
  }
}));

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),

  about: yup.string().required("About info is required."),
  email: yup
    .string()
    .email("Must be Email Format.")
    .required("Email is required.")
});

const AccountSettings = ({ user, updateUser }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [image, setImage] = React.useState(
    user.user.coverImageUrl ? user.user.coverImageUrl : ""
  );
  const [videoSize, setVideoSize] = React.useState(
    user.user.videoDetails && user.user.videoDetails.size
  );
  const [videoName, setVideoName] = React.useState(
    user.user.videoDetails && user.user.videoDetails.name
  );
  const [weightUnit, setWeightUnit] = React.useState(
    user.user.weightUnit ? user.user.weightUnit : "KG"
  );
  const [heightUnit, setHeightUnit] = React.useState(
    user.user.heightUnit ? user.user.heightUnit : "CM"
  );
  const [gender, setGender] = React.useState("Male");
  const [dob, setDob] = React.useState(
    user.user.dateOfBirth ? user.user.dateOfBirth : ""
  );
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(user.user && user.user.videos);

  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" }
  ];

  const uploadProfileImage = async e => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setImage(URL.createObjectURL(e.target.files[0]));
    let blobImage = await fetch(URL.createObjectURL(e.target.files[0])).then(
      r => r.blob()
    );

    const formData = new FormData();

    formData.append("image", blobImage);

    const res = await updateProfileImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      updateUser(res.data.user);
      alert.success("Profile Image Updated");
    }
  };
  const videosUpload = async acceptedFiles => {
    const size = formatBytes(acceptedFiles[0].size, 2);
    setVideoSize(size);
    setVideoName(acceptedFiles[0].name);

    let url = URL.createObjectURL(acceptedFiles[0]);
    let blob = await fetch(url).then(r => r.blob());

    setFile(blob);
  };

  const submitHandler = async values => {
    setLoading(true);
    const videoDetails = {
      name: videoName,
      size: videoSize
    };
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("about", values.about);
    formData.append("dateOfBirth", dob);
    formData.append("gender", gender);
    formData.append("weightUnit", weightUnit);
    formData.append("heightUnit", heightUnit);
    formData.append("videos", file);
    formData.append("videoDetails", JSON.stringify(videoDetails));

    //TODO
    // uploadImage()

    const res = await updateProfile(formData);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      updateUser(res.data.user);
      setLoading(false);

      alert.success("User Changes Saved SuccessFully");
    }
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage
                path={image}
                setPath={setImage}
                upload={e => uploadProfileImage(e)}
              />
            </Col>
          </Row>
        </Form>
      </Container>
      <Formik
        initialValues={{
          firstName: user.user.firstName,
          lastName: user.user.lastName,
          about: user.user.about,
          email: user.user.email
        }}
        validationSchema={schema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit
        }) => (
          <Form>
            <Container>
              <Row form>
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
                    <Col md={{ size: "4", offset: 2 }}>
                      <FormGroup>
                        <Input
                          height={"50px"}
                          type="text"
                          label="First Name"
                          placeholder="John"
                          value={values.firstName}
                          onBlur={handleBlur("firstName")}
                          onChange={handleChange("firstName")}
                          touched={touched.firstName}
                          errors={errors.firstName}
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
                          value={values.lastName}
                          onBlur={handleBlur("lastName")}
                          onChange={handleChange("lastName")}
                          touched={touched.lastName}
                          errors={errors.lastName}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: 8, offset: 2 }}>
                      <FormGroup>
                        <Input
                          height={"50px"}
                          label="About"
                          type="textarea"
                          value={values.about}
                          onBlur={handleBlur("about")}
                          onChange={handleChange("about")}
                          touched={touched.about}
                          errors={errors.about}
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
                          value={dob}
                          onChange={setDob}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: "4" }}>
                      <FormGroup>
                        <DropDown
                          options={option}
                          label="Gender"
                          height={"50px"}
                          type="select"
                          value={gender}
                          setValue={setGender}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: "8", offset: 2 }}>
                      <FormGroup>
                        <Input
                          height={"50px"}
                          label="Email"
                          type="email"
                          placeholder="Email@mail.com"
                          value={values.email}
                          onBlur={handleBlur("email")}
                          onChange={handleChange("email")}
                          touched={touched.email}
                          errors={errors.email}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: 8, offset: 2 }}>
                      <ImageUpload
                        files={file}
                        setSelectedFiles={videosUpload}
                        video
                      />
                      {file !== "" && (
                        <UploadedVideo name={videoName} size={videoSize} />
                      )}
                      {/* {user.user && user.user.videos !== "" && (
                        <UploadedVideo
                          name={user.user && user.user.videoDetails.name}
                          size={user.user && user.user.videoDetails.size}
                        />
                      )} */}
                    </Col>
                    <Col className="mt-3" md={{ size: 8, offset: 2 }}>
                      <label className="h5">Units</label>
                      <Row>
                        <Col>
                          {" "}
                          <label>Weight</label>
                          <br />
                          <RadioButton
                            label="KG"
                            value={weightUnit}
                            setValue={setWeightUnit}
                          />
                          <RadioButton
                            label="LBS"
                            value={weightUnit}
                            setValue={setWeightUnit}
                          />
                        </Col>
                        <Col>
                          {" "}
                          <label>Height</label>
                          <br />
                          <RadioButton
                            label="CM"
                            value={heightUnit}
                            setValue={setHeightUnit}
                          />
                          <RadioButton
                            label="FT & IN"
                            value={heightUnit}
                            setValue={setHeightUnit}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </>
                )}
                <Col md={{ size: 8, offset: 2 }} className="text-center">
                  <Button
                    text="SAVE CHANGES"
                    width="100%"
                    height="2.5rem"
                    onClick={e => {
                      console.log("click");
                      handleSubmit(e);
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const matchDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(updateUser(user));
    }
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(AccountSettings);
