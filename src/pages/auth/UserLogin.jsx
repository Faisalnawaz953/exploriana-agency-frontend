import React from "react"
import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap"
import { useHistory, Link } from "react-router-dom"
import Input from "../../components/ui-elements/Input"
import "../../assets/css/login.css"
import "../../assets/css/button.css"
import Button from "../../components/ui-elements/Button"
import { Formik } from "formik"
import * as yup from "yup"
import { useAlert } from "react-alert"
import ApiLoader from "../../components/ui-elements/ApiLoader"
import get from "lodash/get"
import { loginAsUser } from "../../dataServices/Services"
import { connect } from "react-redux"
import { getUserAuth } from "../../redux/selectors"
import { updateSubUser } from "../../redux/actions/userActions/userActions"

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email is required"),
  password: yup.string().required("Password is required")
})

const UserLogin = ({ updateUser }) => {
  const history = useHistory()
  const alert = useAlert()
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (values) => {
    setLoading(true)
    const email = values.email
    const password = values.password
    const res = await loginAsUser(email, password)

    const resCode = get(res, "status")
    if (resCode !== 200) {
      setLoading(false)

      alert.error("Network Error Try Agian")
    }
    if (resCode === 200) {
      if (!res.data.success) {
        setLoading(false)
        alert.error("User Not Exists")
        return
      }
      setLoading(false)

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userType", "user")
      updateUser(res?.data?.trainer)

      history.push(`/auth?token=${res.data.token}`)
    }
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
          handleSubmit
        } = props
        return (
          <Container className="">
            <Row className="d-flex justify-content-center">
              <Col lg="5" md="7" sm="9" xs="11" className="mt-3 ">
                {/* <ApiLoader /> */}
                <form className=" bg-white p-5  ">
                  <h2 className="text-center my-3">User SignIn</h2>
                  {loading ? (
                    <ApiLoader />
                  ) : (
                    <>
                      <Input
                        label="Your Email"
                        placeholder="forexample@gmail.com"
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChange={handleChange("email")}
                        touched={touched.email}
                        errors={errors.email}
                      />
                      <Input
                        type={"password"}
                        label="Your Password"
                        placeholder="Enter Your Password"
                        value={values.password}
                        onBlur={handleBlur("password")}
                        onChange={handleChange("password")}
                        touched={touched.password}
                        errors={errors.password}
                      />

                      <p className="text-center mt-3">
                        <Link to="/login"> Sign in as Admin</Link>
                      </p>
                    </>
                  )}
                  <div className="text-center">
                    <Button
                      text={loading ? "Sending..." : "Log In"}
                      onClick={handleSubmit}
                      width="100%"
                      height="2.5rem"
                    />
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        )
      }}
    </Formik>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: getUserAuth(state)
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateSubUser(user))
    }
  }
}
export default connect(mapStateToProps, matchDispatchToProps)(UserLogin)
