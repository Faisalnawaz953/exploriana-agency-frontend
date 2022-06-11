import React from "react"
import BackButton from "../../components/ui-elements/BackButton"
import { Row, Col } from "reactstrap"
import Input from "../../components/ui-elements/Input"
import Button from "../../components/ui-elements/Button"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Formik } from "formik"
import * as yup from "yup"
import { isEmpty, get } from "lodash"
import { useAlert } from "react-alert"
import ApiLoader from "../../components/ui-elements/ApiLoader"
import { addLink } from "../../dataServices/Services"

const linkSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last is required"),
  email: yup.string().email("Enter Valid Email").required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number Is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits")
})

const useStyles = makeStyles((theme) => ({
  heading: {
    fontStyle: " normal",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "32px",

    textAlign: "center",
    letterSpacing: "0.6px",

    color: "#2B2B2B"
  }
}))
export default function Link() {
  const alert = useAlert()
  const history = useHistory()
  const classes = useStyles()

  const [loading, setLoading] = React.useState(false)

  const uploadLink = async (values) => {
    setLoading(true)
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber
    }
    const res = await addLink(data)
    console.log(res)

    const resCode = get(res, "status")
    if (resCode !== 200) {
      setLoading(false)

      alert.error("Network Error Try Agian")
    }
    if (resCode === 200) {
      values.firstName = ""
      values.lastName = ""
      values.phoneNumber = ""
      values.email = ""
      setLoading(false)
      alert.success("Guide Added SuccessFully")
    }
  }
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
      }}
      validationSchema={linkSchema}
      onSubmit={uploadLink}
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
          <div>
            <BackButton
              title={"Back to Guides"}
              onClick={() => {
                history.push("/guide")
              }}
            />
            <Row className="d-flex justify-content-center w-100 align-items-center pt-5 ">
              <Col xl={7} lg={8} sm={12} md={8}>
                <div className="text-center">
                  <p className={classes.heading}>Add Guide</p>
                </div>
                <Row className="d-flex justify-content-center w-100 align-items-center ">
                  {loading ? (
                    <Col
                      xl={10}
                      lg={10}
                      md={12}
                      sm={12}
                      style={{ height: "290px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <ApiLoader />
                    </Col>
                  ) : (
                    <>
                      {" "}
                      <Col xl={10} lg={10} md={12} sm={12}>
                        <Input
                          label="First Name"
                          backgroundColor
                          placeholder="Enter Guide First Name"
                          value={values.firstName}
                          onBlur={handleBlur("firstName")}
                          onChange={handleChange("firstName")}
                          touched={touched.firstName}
                          errors={errors.firstName}
                        />
                      </Col>
                      <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                        <Input
                          label="Last Name"
                          backgroundColor
                          placeholder="Enter Guide Last Name"
                          value={values.lastName}
                          onBlur={handleBlur("lastName")}
                          onChange={handleChange("lastName")}
                          touched={touched.lastName}
                          errors={errors.lastName}
                        />
                      </Col>
                      <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                        <Input
                          label="Email"
                          backgroundColor
                          placeholder="Enter Guide Email"
                          value={values.email}
                          onBlur={handleBlur("email")}
                          onChange={handleChange("email")}
                          touched={touched.email}
                          errors={errors.email}
                        />
                      </Col>
                      <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                        <Input
                          label="Phone Number"
                          backgroundColor
                          placeholder="Enter Guide Phone Number"
                          value={values.phoneNumber}
                          onBlur={handleBlur("phoneNumber")}
                          onChange={handleChange("phoneNumber")}
                          touched={touched.phoneNumber}
                          errors={errors.phoneNumber}
                        />
                      </Col>
                    </>
                  )}
                  <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                    <Button
                      text="Add Guide"
                      width="100%"
                      onClick={handleSubmit}
                      height="2.5rem"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
      }}
    </Formik>
  )
}
