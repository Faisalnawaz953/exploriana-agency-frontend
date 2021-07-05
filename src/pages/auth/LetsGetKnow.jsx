import React from "react";
import { Container, Row, Col } from "reactstrap";
// import React, { lazy, Suspense } from "react";
import { useHistory, Link } from "react-router-dom";
import Input from "../../components/ui-elements/Input";
import "../../assets/css/button.css";
import "../../assets/css/login.css";
import Button from "../../components/ui-elements/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { registerProfile } from "../../dataServices/Services";
import { useAlert } from "react-alert";
import get from "lodash/get";
import ApiLoader from "../../components/ui-elements/ApiLoader";

const userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

const LetsGetKnow = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState();
  const alert = useAlert();
  const saveUserData = async (values) => {
    setLoading(true);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
    };
    //TODO
    // uploadImage()

    const res = await registerProfile(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);

      alert.success("User Changes Saved SuccessFully");
      history.push("/");
    }
  };
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "" }}
      validationSchema={userSchema}
      onSubmit={saveUserData}
    >
      {(props) => {
        const {
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
        } = props;
        return (
          <Container className="  my-5 ">
            <Row className="d-flex justify-content-center">
              <Col lg="5" md="7" sm="9" xs="11" className="mt-5 ">
                <form className=" bg-white p-5 ">
                  <h2 className="text-center my-3"> Let’s get to know you</h2>
                  {loading ? (
                    <ApiLoader />
                  ) : (
                    <>
                      <Input
                        label="First Name"
                        placeholder="First Name"
                        value={values.firstName}
                        onBlur={handleBlur("firstName")}
                        onChange={handleChange("firstName")}
                        touched={touched.firstName}
                        errors={errors.firstName}
                      />
                      <Input
                        label="Last Name"
                        placeholder="Last Name"
                        value={values.lastName}
                        onBlur={handleBlur("lastName")}
                        onChange={handleChange("lastName")}
                        touched={touched.lastName}
                        errors={errors.lastName}
                      />
                    </>
                  )}
                  <div className="text-center">
                    <Button
                      onClick={() => history.push("login-success")}
                      text={"Save"}
                      width="100%"
                      height="2.5rem"
                      onClick={handleSubmit}
                    />{" "}
                  </div>

                  <p className="text-center mt-3">
                    Dont have an account? <Link to="register">Sign Up</Link>
                  </p>
                </form>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

export default LetsGetKnow;
