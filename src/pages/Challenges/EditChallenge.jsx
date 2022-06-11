import React, { useRef } from "react"
import { Container, Form, Col, Row } from "reactstrap"
import BackButton from "../../components/ui-elements/BackButton"
import { useHistory } from "react-router-dom"
import Input from "../../components/ui-elements/Input"
import ImageUpload from "../../components/ui-elements/ImageUpload"
import Button from "../../components/ui-elements/Button"
import { useAlert } from "react-alert"
import ApiLoader from "../../components/ui-elements/ApiLoader"
import get from "lodash/get"
import UploadedImage from "../../components/ui-elements/UploadedImage"
import TextButton from "../../components/ui-elements/TextButton"
import EditVideosPopup from "../../components/ui-elements/EditVideosPopUp"
import EditClassesPopup from "../../components/ui-elements/EditClassPopUp"
import { Formik } from "formik"
import * as yup from "yup"
import { addChallange } from "../../dataServices/Services"
import { connect } from "react-redux"
import { getChallenges, getClassrooms, getVideos } from "../../redux/selectors"
import { useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import { updateUserChallenge } from "../../dataServices/Services"
import { formatBytes } from "../../config/GlobalFunctions"

const uploadChallangeSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),

  description: yup.string().required("Description is required.")
})

const EditChallenge = ({ challenges, classrooms, videos }) => {
  const history = useHistory()
  const { id } = useParams()
  const videoRef = useRef()
  const classRef = useRef()
  const alert = useAlert()
  const [startDate, setStartDate] = React.useState()
  const [endDate, setEndDate] = React.useState()
  const [file, setFile] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [challenge, setChallenge] = React.useState()

  const [workoutVideos, setWorkoutVideos] = React.useState([])
  const [workoutClasses, setWorkoutClasses] = React.useState([])
  const [imageSize, setImageSize] = React.useState("")
  const [imageName, setImageName] = React.useState("")
  const [coverImage, setCoverImage] = React.useState("")

  const getSingleChallenge = () => {
    if (!isEmpty(challenges)) {
      let singleChallenge = challenges.filter(
        (challenge) => challenge._id === id
      )

      setChallenge(singleChallenge[0])

      setCoverImage(singleChallenge[0].coverImage)
      setImageName(singleChallenge[0].imageDetails.name)
      setImageSize(singleChallenge[0].imageDetails.size)
    } else {
      alert.error("Network Error or no Challenge exists")
      history.push("/challenges")
    }
  }
  const toggleVideoPopUp = () => {
    if (videoRef.current.style.display === "block") {
      videoRef.current.style.display = "none"
    } else {
      videoRef.current.style.display = "block"
      classRef.current.style.display = "none"
    }
  }
  const toggleClassPopUp = () => {
    if (classRef.current.style.display === "block") {
      classRef.current.style.display = "none"
    } else {
      classRef.current.style.display = "block"
      videoRef.current.style.display = "none"
    }
  }
  const imageUpload = async (acceptedFiles) => {
    const size = formatBytes(acceptedFiles[0].size)
    setImageSize(size)
    setImageName(acceptedFiles[0].name)
    let url = URL.createObjectURL(acceptedFiles[0])
    setCoverImage(url)
    let blob = await fetch(url).then((r) => r.blob())

    setFile(blob)
  }
  const updateChallenge = async (values) => {
    setLoading(true)
    const formData = new FormData()

    let workouts = {
      videos: workoutVideos,
      classes: workoutClasses
    }
    const imageDetails = {
      name: imageName,
      size: imageSize
    }
    formData.append("title", values.title)
    formData.append("description", values.description)
    formData.append("image", file)
    formData.append("startDate", startDate)
    formData.append("endDate", endDate)
    formData.append("notes", values.notes)
    formData.append("price", values.price)
    formData.append("workouts", JSON.stringify(workouts))
    formData.append("imageDetails", JSON.stringify(imageDetails))

    const res = await updateUserChallenge(id, formData)
    console.log(res)
    const resCode = get(res, "status")
    if (resCode !== 200) {
      setLoading(false)

      alert.error("Network Error Try Agian")
    }
    if (resCode === 200) {
      setLoading(false)

      alert.success("Challenge upated SuccessFully")
    }
  }

  React.useEffect(() => {
    getSingleChallenge()
  }, [])

  return (
    <Formik
      initialValues={{
        title: challenge && challenge.title,
        description: challenge && challenge.description,
        notes: challenge && challenge.notes,
        price: challenge && challenge.price
      }}
      validationSchema={uploadChallangeSchema}
      onSubmit={updateChallenge}
      enableReinitialize={true}
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
              title="Back to posts"
              onClick={() => history.push("/posts")}
            />
            <Container className="text-center">
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <h3>
                      <b>Edit Challenge</b>
                    </h3>
                  </Col>
                </Row>
              </Form>
            </Container>
            <Container>
              <Form className="  my-5">
                <Row form className="  mb-5">
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
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Title"
                          color="white"
                          height="50px"
                          placeholder="Enter your Class Name"
                          backgroundColor
                          value={values.title}
                          onBlur={handleBlur("title")}
                          onChange={handleChange("title")}
                          touched={touched.title}
                          errors={errors.title}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Image"
                          setSelectedFiles={imageUpload}
                        />
                        {coverImage !== "" && (
                          <UploadedImage
                            size={imageSize}
                            name={imageName}
                            url={coverImage}
                          />
                        )}
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Description "
                          type="textarea"
                          placeholder="Details about your Class"
                          color="white"
                          height="80px"
                          backgroundColor
                          value={values.description}
                          onBlur={handleBlur("description")}
                          onChange={handleChange("description")}
                          touched={touched.description}
                          errors={errors.description}
                        />
                      </Col>
                    </>
                  )}

                  <Col md={{ size: 8, offset: 2 }} className="text-center mb-5">
                    <Button
                      text={"Save Changes"}
                      width="100%"
                      height="2.5rem"
                      onClick={handleSubmit}
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
    challenges: getChallenges(state),
    classrooms: getClassrooms(state),
    videos: getVideos(state)
  }
}

export default connect(mapStateToProps, null)(EditChallenge)
