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
import * as yup from "yup";

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
  // coverImageUrl: yup.string().required(),
  weightUnit: yup.string().required(),
  heightUnit: yup.string().required(),
});

const AccountSettings = () => {
  const classes = useStyles();
  const option = [
    { key: "option-1", value: "Male" },
    { key: "option-2", value: "Female" },
  ];

  const submitHandler = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage src={ProfilePic}  />
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
          <form>
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
                <Col md={{ size: 8, offset: 2 }}>
                  <Units handleChange={handleChange} errors={errors} />
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
          </form>
        )}
      </Formik>
    </>
  );
};

export default AccountSettings;
