import React from "react";
import "../../assets/css/login.css";
import Input from "../../components/ui-elements/Input";
import Button from "../../components/ui-elements/Button";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import "../../assets/css/button.css";
import * as yup from "yup";
import { Formik } from "formik";
import { useAlert } from "react-alert";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import { register } from "../../dataServices/Services";
import get from "lodash/get";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email is required"),
});

export default function Register() {
  const history = useHistory();
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const { email } = data;
    const res = await register(email);
    console.log(res);

    const resCode = get(res, "status");
    console.log();
    if (resCode !== 200) {
      console.log(resCode);
      if (resCode === 201) {
        setLoading(false);

        alert.error("User  Already exists");
      } else {
        setLoading(false);

        alert.error("Network Error Try Agian");
      }
    }
    if (resCode === 200) {
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      alert.success("Register Link Sent");
      history.push("/register-success");
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
      }) => (
        <Container className="  my-5 ">
          <Row className="d-flex justify-content-center">
            <Col lg="5" md="7" sm="9" xs="11" className="mt-5 ">
              <form className=" bg-white p-5  ">
                <h2 className="text-center my-3"> Sign Up</h2>
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

                    <div className="d-flex">
                      {" "}
                      <div>
                        {" "}
                        <CustomInput
                          className="mt-1"
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          label=""
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="p-2">
                        {" "}
                        I confirm that I have read and agree to the{" "}
                        <a
                          href="#"
                          style={{ fontWeight: "600", color: "#429FBA" }}
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          style={{ fontWeight: "600", color: "#429FBA" }}
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </div>
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
                  Dont have an account? <Link to="/login">Sign In</Link>
                </p>
              </form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
