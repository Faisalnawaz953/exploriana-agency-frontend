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
import { uploadImage, updateProfile } from "../../../dataServices/Services";
import RadioButton from "../../ui-elements/RadioButton";
import ApiLoader from "../../ui-elements/ApiLoader";

const useStyles = makeStyles((theme) => ({
  headText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    /* identical to box height, or 150% */

    letterSpacing: "0.6px",

    color: "#2B2B2B",
  },
}));

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),

  about: yup.string().required("About info is required."),
  email: yup
    .string()
    .email("Must be Email Format.")
    .required("Email is required."),
});

const AccountSettings = () => {
  const classes = useStyles();
  const alert = useAlert();
  const [image, setImage] = React.useState();
  const [weightUnit, setWeightUnit] = React.useState("KG");
  const [heightUnit, setHeightUnit] = React.useState("CM");
  const [gender, setGender] = React.useState("Male");
  const [dob, setDob] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" },
  ];

  const submitHandler = async (values) => {
    setLoading(true);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: dob,
      gender: gender,
      about: values.about,
      coverImageUrl: "zawar@gmail.com",
      weightUnit: weightUnit,
      heightUnit: heightUnit,
    };
    //TODO
    // uploadImage()

    const res = await updateProfile(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);

      alert.success("User Changes Saved SuccessFully");
    }
  };

  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage path={image} setPath={setImage} />
            </Col>
          </Row>
        </Form>
      </Container>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          about: "",
          email: "",
        }}
        validationSchema={schema}
        onSubmit={submitHandler}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
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
                      <ImageUpload />
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
                    onClick={(e) => {
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

export default AccountSettings;
