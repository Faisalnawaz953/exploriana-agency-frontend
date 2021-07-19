import React from "react";
import ProfilePic from "../../../../assets/images/Ellipse22.png";
import { Container, Col, Row, FormGroup, Form } from "reactstrap";
import Input from "../../../ui-elements/Input";
import Button from "../../../ui-elements/Button";
import ImageUpload from "../../../ui-elements/ImageUpload";
import { useHistory } from "react-router-dom";
import BackButton from "../../../ui-elements/BackButton";
import TrainerReviews from "../../../TrainerReviews";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";
import EditImage from "../../../ui-elements/EditImage";
import { Formik } from "formik";
import * as yup from "yup";
import UploadedImage from "../../../ui-elements/UploadedImage";
import { useAlert } from "react-alert";
import ApiLoader from "../../../ui-elements/ApiLoader";
import get from "lodash/get";
import { addTrainer, updateImage } from "../../../../dataServices/Services";

const addTrainerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),

  about: yup.string().required("About info is required."),
  email: yup
    .string()
    .email("Must be Email Format.")
    .required("Email is required."),
  facebook: yup.string().required("Facebook link is required"),
  instagram: yup.string().required("Instagram link is required"),
  twitter: yup.string().required("Twitter link is required")
});
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

const AddTrainerInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState();
  const alert = useAlert();
  const [blobImage, setBlobImage] = React.useState();

  const videosUpload = async acceptedFiles => {
    let url = URL.createObjectURL(acceptedFiles[0]);
    let blob = await fetch(url).then(r => r.blob());
    let file = [...files];
    file.push(blob);
    setFiles(file);
  };

  const uploadTrainerImage = async e => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setImage(URL.createObjectURL(e.target.files[0]));
    let blobimage = await fetch(URL.createObjectURL(e.target.files[0])).then(
      r => r.blob()
    );
    const formData = new FormData();

    formData.append("image", blobimage);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setBlobImage(res.data.imageUrl);
      alert.success("Trainer Image Added");
    }
  };
  const uploadTrainer = async values => {
    setLoading(true);
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("videos", files[0]);
    formData.append("email", values.email);
    formData.append("about", values.about);
    formData.append("twitter", values.twitter);
    formData.append("facebook", values.facebook);
    formData.append("instagram", values.instagram);
    formData.append("image", blobImage);
    const res = await addTrainer(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);
      values.email = "";
      values.twitter = "";
      values.about = "";
      values.instagram = "";
      values.about = "";
      values.facebook = "";
      values.firstName = "";
      values.lastName = "";
      setFiles([]);
      setImage("");
      setBlobImage("");

      alert.success("Trainer Added SuccessFully");
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        about: "",
        facebook: "",
        twitter: "",
        instagram: ""
      }}
      validationSchema={addTrainerSchema}
      onSubmit={uploadTrainer}
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
              title="Back to Trainers"
              onClick={() => history.push("/profile")}
            />
            <Container>
              <Row className="text-center">
                <Col md={{ size: 12 }}>
                  <div className={classes.headText}>Add New Trainer</div>
                  <EditImage
                    path={image}
                    setPath={setImage}
                    upload={e => uploadTrainerImage(e)}
                  />
                </Col>
              </Row>
            </Container>
            <Container>
              <Form>
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
                            placeholder="Enter First Name"
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
                            placeholder="Enter Last Name"
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
                            height={"80px"}
                            label="About"
                            type="textarea"
                            placeholder="Details about Trainer"
                            value={values.about}
                            onBlur={handleBlur("about")}
                            onChange={handleChange("about")}
                            touched={touched.about}
                            errors={errors.about}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <FormGroup>
                          <Input
                            height={"50px"}
                            label="Email"
                            type="email"
                            placeholder="Enter Trainer Email"
                            value={values.email}
                            onBlur={handleBlur("email")}
                            onChange={handleChange("email")}
                            touched={touched.email}
                            errors={errors.email}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <h6>
                          <b>Social media links:</b>
                        </h6>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <FormGroup>
                          <Input
                            height={"50px"}
                            label="Instagram"
                            type="text"
                            placeholder="Enter Trainer instagram"
                            value={values.instagram}
                            onBlur={handleBlur("instagram")}
                            onChange={handleChange("instagram")}
                            touched={touched.instagram}
                            errors={errors.instagram}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <FormGroup>
                          <Input
                            height={"50px"}
                            label="Facebook"
                            type="text"
                            placeholder="Enter Trainer Facebook"
                            value={values.facebook}
                            onBlur={handleBlur("facebook")}
                            onChange={handleChange("facebook")}
                            touched={touched.facebook}
                            errors={errors.facebook}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <FormGroup>
                          <Input
                            height={"50px"}
                            label="Twitter"
                            type="text"
                            placeholder="Enter Trainer Twitter"
                            value={values.twitter}
                            onBlur={handleBlur("twitter")}
                            onChange={handleChange("twitter")}
                            touched={touched.twitter}
                            errors={errors.twitter}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Intro video file"
                          files={files}
                          setSelectedFiles={videosUpload}
                        />
                        {files &&
                          files.map((file, i) => <UploadedImage key={i} />)}
                      </Col>
                    </>
                  )}
                  <Col
                    md={{ size: 8, offset: 2 }}
                    className="text-center"
                    className="mb-5"
                  >
                    {/* <Col md={{ size: 12 }}>
                <TrainerReviews />
              </Col> */}
                    <Button
                      onClick={handleSubmit}
                      text="Add"
                      width="100%"
                      height="2.5rem"
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

export default AddTrainerInfo;
