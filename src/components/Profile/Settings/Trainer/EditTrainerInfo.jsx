import React from "react"
import ProfilePic from "../../../../assets/images/Ellipse22.png"
import { Container, Col, Row, FormGroup, Form } from "reactstrap"
import Input from "../../../ui-elements/Input"
import Button from "../../../ui-elements/Button"
import ImageUpload from "../../../ui-elements/ImageUpload"
import { useHistory } from "react-router-dom"
import BackButton from "../../../ui-elements/BackButton"
import TrainerReviews from "../../../TrainerReviews"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import EditImage from "../../../ui-elements/EditImage"
import { Formik } from "formik"
import * as yup from "yup"
import { useAlert } from "react-alert"
import ApiLoader from "../../../ui-elements/ApiLoader"
import get from "lodash/get"
import {
  addTrainer,
  updateImage,
  updateTrainer
} from "../../../../dataServices/Services"
import { formatBytes } from "../../../../config/GlobalFunctions"
import { getAllTrainers } from "../../../../redux/selectors"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"

const addTrainerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),

  about: yup.string().required("About info is required."),
  email: yup
    .string()
    .email("Must be Email Format.")
    .required("Email is required."),

  instagram: yup.string().required("Password is Required")
})
const useStyles = makeStyles((theme) => ({
  headText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    letterSpacing: "0.6px",
    color: "#2B2B2B"
  }
}))

const EditTrainerInfo = ({ trainers }) => {
  const classes = useStyles()
  const history = useHistory()

  const [loading, setLoading] = React.useState(false)

  const alert = useAlert()

  const { id } = useParams()
  const [trainer, setTrainer] = React.useState()
  const getTrainer = () => {
    let singleTrainer = trainers.filter((liveClass) => liveClass._id === id)
    setTrainer(singleTrainer[0])
  }

  React.useEffect(() => {
    getTrainer()
  }, [])

  const editTrainer = async (values) => {
    setLoading(true)

    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      about: values.about,
      password: values.instagram
    }
    const res = await updateTrainer(id, data)
    console.log(res)

    const resCode = get(res, "status")
    if (resCode !== 200) {
      setLoading(false)
      alert.error("Network Error Try Agian")
    }
    if (resCode === 200) {
      setLoading(false)
      alert.success("Trainer Updated Successfully.")
    }
  }

  return (
    <Formik
      initialValues={{
        firstName: trainer?.firstName,
        lastName: trainer?.lastName,
        email: trainer?.email,
        about: trainer?.about,
        instagram: trainer?.password
      }}
      enableReinitialize
      validationSchema={addTrainerSchema}
      onSubmit={editTrainer}
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
          <>
            {" "}
            <BackButton
              title="Back to Users"
              onClick={() => history.push("/profile")}
            />
            <Container>
              <Row className="text-center">
                <Col md={{ size: 12 }}>
                  <div className={classes.headText}>Edit User</div>
                  {/* <EditImage
                    path={image}
                    setPath={setImage}
                    upload={(e) => uploadTrainerImage(e)}
                  /> */}
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
                            placeholder="Details about User"
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
                            placeholder="Enter  Email"
                            value={values.email}
                            onBlur={handleBlur("email")}
                            onChange={handleChange("email")}
                            touched={touched.email}
                            errors={errors.email}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <FormGroup>
                          <Input
                            height={"50px"}
                            label="Password"
                            type="text"
                            placeholder="Enter  password"
                            value={values.instagram}
                            onBlur={handleBlur("instagram")}
                            onChange={handleChange("instagram")}
                            touched={touched.instagram}
                            errors={errors.instagram}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  )}
                  <Col md={{ size: 8, offset: 2 }} className="text-center">
                    <Button
                      onClick={handleSubmit}
                      text="Update"
                      width="100%"
                      height="2.5rem"
                    />
                  </Col>
                </Row>
              </Form>
            </Container>
          </>
        )
      }}
    </Formik>
  )
}
const mapStateToProps = (state) => {
  return {
    trainers: getAllTrainers(state)
  }
}

export default connect(mapStateToProps, null)(EditTrainerInfo)
