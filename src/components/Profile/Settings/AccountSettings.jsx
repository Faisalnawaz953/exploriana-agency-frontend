import React from "react";
import { Container, Row, Col, FormGroup, Label, Form } from "reactstrap";
import ProfilePic from "../../../assets/images/Ellipse 122.png";
import Input from "../../ui-elements/Input";
import DropDown from "../../ui-elements/DropDown";
import ImageUpload from "../../ui-elements/ImageUpload";
import Button from "../../ui-elements/Button";
import Units from "../../ui-elements/Units";
import EditImage from "../../ui-elements/EditImage";
import { Edit } from "react-feather";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";
import { Formik } from "formik";
import { useAlert } from "react-alert";
import * as yup from "yup";
import { uploadImage, updateProfile } from "../../../dataServices/Services";
import RadioButton from "../../ui-elements/RadioButton";

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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.string().required(),
  gender: yup.string().required(),
  about: yup.string().required(),
  email: yup.string().email().required(),
  coverImageUrl: yup.string().required(),
});

const AccountSettings = () => {
  const classes = useStyles();
  const alert = useAlert();
  const [image, setImage] = React.useState();
  const [weightUnit, setWeightUnit] = React.useState("KG");
  const [heightUnit, setHeightUnit] = React.useState("CM");
  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" },
  ];

  const submitHandler = async (data) => {
    console.log(data);
    //TODO
    // uploadImage()
    updateProfile(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert.error("Network Error Try Agian");
      });
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
          dateOfBirth: "",
          gender: "Male",
          about: "",
          email: "",
          coverImageUrl:
            "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg",
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
                      value={values.dateOfBirth}
                      onBlur={handleBlur("dateOfBirth")}
                      onChange={handleChange("dateOfBirth")}
                      touched={touched.dateOfBirth}
                      errors={errors.dateOfBirth}
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
                      value={values.gender}
                      onChange={handleChange("gender")}
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
