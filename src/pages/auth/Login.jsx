import React from "react";
import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import Input from "../../components/ui-elements/Input";
import "../../assets/css/login.css";
import "../../assets/css/button.css";
import Button from "../../components/ui-elements/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { useAlert } from "react-alert";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import get from "lodash/get";
import { authService } from "../../dataServices/Services";
import { connect } from "react-redux";
import { getUserAuth } from "../../redux/selectors";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email is required"),
});

const Login = () => {
  const history = useHistory();
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);
  // console.log(auth);

  const onSubmit = async (values) => {
    setLoading(true);
    const email = values.email;
    const res = await authService(email);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      alert.success("Login Link Sent");
      history.push("/login-success");
    }
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
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
          <Container className="">
            <Row className="d-flex justify-content-center">
              <Col lg="5" md="7" sm="9" xs="11" className="mt-3 ">
                {/* <ApiLoader /> */}
                <form className=" bg-white p-5  ">
                  <h2 className="text-center my-3"> Sign In</h2>
                  {loading ? (
                    <ApiLoader />
                  ) : (
                    <>
                      <Input
                        label="Your Email"
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChange={handleChange("email")}
                        placeholder="forexample@gmail.com"
                        touched={touched.email}
                        errors={errors.email}
                      />

                      <FormGroup>
                        <CustomInput
                          className="mt-5"
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          label="Keep  Me Logged In"
                        />
                      </FormGroup>
                    </>
                  )}
                  <div className="text-center">
                    <Button
                      text={loading ? "Sending..." : "Send Me a Login Link"}
                      onClick={handleSubmit}
                      width="100%"
                      height="2.5rem"
                    />
                  </div>

                  <p className="text-center mt-3">
                    Dont have an account? <Link to="/register">Sign Up</Link>
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

const mapStateToProps = (state) => {
  return {
    auth: getUserAuth(state),
  };
};
export default connect(mapStateToProps, null)(Login);
