import React from "react";
import { Container, Row, Col, Form, CustomInput } from "reactstrap";
import ImageUpload from "../../ui-elements/ImageUpload";
import Input from "../../ui-elements/Input";
import Button from "../../ui-elements/Button";
import RadioButton from "../../ui-elements/RadioButton";
import UploadedImage from "../../ui-elements/UploadedImage";
import { useAlert } from "react-alert";
import { Formik } from "formik";
import ApiLoader from "../../ui-elements/ApiLoader";
import { updateLandingPage } from "../../../dataServices/Services";
import * as yup from "yup";
import get from "lodash/get";
import { updateImage } from "../../../dataServices/Services";
import { connect } from "react-redux";
import { getLandingPageData } from "../../../redux/selectors";
import { updateLanding } from "../../../redux/actions/userActions/userActions";
import { LandscapeOutlined } from "@material-ui/icons";
import { formatBytes } from "../../../config/GlobalFunctions";
import UploadedVideo from "../../ui-elements/UploadedVideo";

const LandingPageSchema = yup.object().shape({
  heroTitle: yup.string().required("Hero Title is required."),
  heroDescription: yup.string().required("Hero Description is required."),
  accessTitle: yup.string().required("Access Title is required."),
  accessDescription: yup.string().required("Access Description is required.")
});

const LandingPage = ({ landing, updateLanding }) => {
  const alert = useAlert();
  const [membership, setMemberShip] = React.useState(
    landing && landing.accessMembership ? "Show" : "Hide"
  );
  const [review, setReview] = React.useState(
    landing && landing.accessReview ? "Show" : "Hide"
  );
  const [heroCoverImage, setHeroCoverImage] = React.useState(
    landing && landing.heroCoverImageUrl ? landing.heroCoverImageUrl : ""
  );
  const [heroTrailerVideo, setHeroTrailerVideo] = React.useState(
    landing && landing.heroTrailerVideoUrl ? landing.heroTrailerVideoUrl : ""
  );
  const [accessCoverImage, setAccessCoverImage] = React.useState(
    landing && landing.accessCoverImageUrl ? landing.accessCoverImageUrl : ""
  );
  const [loading, setLoading] = React.useState(false);
  const [heroImageSize, setHeroImageSize] = React.useState("");
  const [heroImageName, setHeroImageName] = React.useState("");
  const [trailerVideoSize, setTrailerVideoSize] = React.useState("");
  const [trailerVideoName, setTrailerVideoName] = React.useState("");
  const [accessImageSize, setAccessImageSize] = React.useState("");
  const [accessImageName, setAccessImageName] = React.useState("");
  const [loadingHeroImage, setLoadingHeroImage] = React.useState(false);
  const [loadingAccessImage, setLoadingAccessImage] = React.useState(false);
  const [loadingHeroVideo, setLoadingHeroVideo] = React.useState(false);

  const onSave = async values => {
    setLoading(true);
    const heroCoverImageDetails = {
      name: heroImageName,
      size: heroImageSize
    };
    const heroTrailerDetails = {
      size: trailerVideoSize,
      name: trailerVideoName
    };
    const accessCoverImageDetails = {
      size: accessImageSize,
      name: accessImageName
    };
    const data = {
      heroCoverImageUrl: heroCoverImage,
      heroTitle: values.heroTitle,
      heroDescription: values.heroDescription,
      heroTrailerVideoUrl: heroTrailerVideo,
      accessCoverImageUrl: accessCoverImage,
      accessTitle: values.accessTitle,
      accessDescription: values.accessDescription,
      accessReview: review === "Show",
      accessMembership: membership === "Show",
      heroCoverImageDetails: heroCoverImageDetails,
      heroTrailerDetails: heroTrailerDetails,
      accessCoverImageDetails: accessCoverImageDetails
    };
    const res = await updateLandingPage(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      updateLanding(res.data.landing);
      setLoading(false);
      alert.success("Landing Page Updated.");
    }
  };

  const uploadHeroCoverImage = async acceptedFiles => {
    setLoadingHeroImage(true);
    setHeroImageName(acceptedFiles[0].name);
    const size = formatBytes(acceptedFiles[0].size);
    setHeroImageSize(size);
    let url = URL.createObjectURL(acceptedFiles[0]);
    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingHeroImage(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setHeroCoverImage(res.data.imageUrl);
      setLoadingHeroImage(false);
      alert.success("Cover Image Added");
    }
  };
  const uploadHeroTrailerVideo = async acceptedFiles => {
    setLoadingHeroVideo(true);
    const size = formatBytes(acceptedFiles[0].size);
    setTrailerVideoSize(size);
    setTrailerVideoName(acceptedFiles[0].name);
    let url = URL.createObjectURL(acceptedFiles[0]);
    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingHeroVideo(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setHeroTrailerVideo(res.data.imageUrl);
      setLoadingHeroVideo(false);
      alert.success("Trailer Video Added");
    }
  };
  const uploadAccessCoverImage = async acceptedFiles => {
    setLoadingAccessImage(true);
    setAccessImageName(acceptedFiles[0].name);
    const size = formatBytes(acceptedFiles[0].size);
    setAccessImageSize(size);
    let url = URL.createObjectURL(acceptedFiles[0]);
    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingAccessImage(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setAccessCoverImage(res.data.imageUrl);
      setLoadingAccessImage(false);
      alert.success("Access Image Added");
    }
  };
  return (
    <Formik
      initialValues={{
        heroTitle: landing && landing.heroTitle ? landing.heroTitle : "",
        heroDescription:
          landing && landing.heroDescription ? landing.heroDescription : "",
        accessTitle: landing && landing.accessTitle ? landing.accessTitle : "",
        accessDescription:
          landing && landing.accessDescription ? landing.accessDescription : ""
      }}
      validationSchema={LandingPageSchema}
      onSubmit={onSave}
      enableReinitialize={true}
    >
      {props => {
        const {
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit
        } = props;
        return (
          <>
            <Container className="text-center my-5">
              <Form>
                <Row className="my-5">
                  <Col md={{ size: 12 }}>
                    <h1>Landing Page</h1>
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
                      {" "}
                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Hero:</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Cover image"
                          setSelectedFiles={uploadHeroCoverImage}
                          loadingFile={loadingHeroImage}
                        />
                        {heroCoverImage !== "" && (
                          <UploadedImage
                            size={
                              heroImageSize === ""
                                ? landing && landing.heroCoverImageDetails.size
                                : heroImageSize
                            }
                            url={heroCoverImage}
                            name={
                              heroImageName === ""
                                ? landing && landing.heroCoverImageDetails.name
                                : heroImageName
                            }
                          />
                        )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Title"
                          value={values.heroTitle}
                          onBlur={handleBlur("heroTitle")}
                          onChange={handleChange("heroTitle")}
                          touched={touched.heroTitle}
                          errors={errors.heroTitle}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Description"
                          type="textarea"
                          value={values.heroDescription}
                          onBlur={handleBlur("heroDescription")}
                          onChange={handleChange("heroDescription")}
                          touched={touched.heroDescription}
                          errors={errors.heroDescription}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Trailer video(optional)"
                          setSelectedFiles={uploadHeroTrailerVideo}
                          video
                          loadingFile={loadingHeroVideo}
                        />
                        {heroTrailerVideo !== "" && (
                          <UploadedVideo
                            name={
                              trailerVideoName === ""
                                ? landing && landing.heroTrailerDetails.name
                                : trailerVideoName
                            }
                            size={
                              trailerVideoSize === ""
                                ? landing && landing.heroTrailerDetails.size
                                : trailerVideoSize
                            }
                          />
                        )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }} className="mt-4 mb-4 h6">
                        <b>Access:</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Cover image"
                          setSelectedFiles={uploadAccessCoverImage}
                          loadingFile={loadingAccessImage}
                        />
                        {accessCoverImage !== "" && (
                          <UploadedImage
                            url={accessCoverImage}
                            name={
                              accessImageName === ""
                                ? landing &&
                                  landing.accessCoverImageDetails.name
                                : accessImageName
                            }
                            size={
                              accessImageSize === ""
                                ? landing &&
                                  landing.accessCoverImageDetails.size
                                : accessImageSize
                            }
                          />
                        )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Title"
                          value={values.accessTitle}
                          onBlur={handleBlur("accessTitle")}
                          onChange={handleChange("accessTitle")}
                          touched={touched.accessTitle}
                          errors={errors.accessTitle}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Description"
                          type="textarea"
                          value={values.accessDescription}
                          onBlur={handleBlur("accessDescription")}
                          onChange={handleChange("accessDescription")}
                          touched={touched.accessDescription}
                          errors={errors.accessDescription}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <p>
                          <b>Review</b>
                        </p>
                        <Row form>
                          <RadioButton
                            label="Show"
                            value={review}
                            setValue={setReview}
                          />
                          <RadioButton
                            label="Hide"
                            value={review}
                            setValue={setReview}
                          />
                        </Row>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <p>
                          <b>Membership</b>
                        </p>
                        <Row form>
                          <RadioButton
                            label="Show"
                            value={membership}
                            setValue={setMemberShip}
                          />
                          <RadioButton
                            label="Hide"
                            value={membership}
                            setValue={setMemberShip}
                          />
                        </Row>
                      </Col>
                    </>
                  )}
                  <Col md={{ size: 8, offset: 2 }} className="mb-5">
                    <Button
                      text={"Save"}
                      width="100%"
                      onClick={handleSubmit}
                      height="2.5rem"
                    />
                  </Col>
                </Row>
              </Form>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

export const mapStateToProps = state => {
  return {
    landing: getLandingPageData(state)
  };
};

export const matchDispatchToProps = dispatch => {
  return {
    updateLanding: landing => {
      dispatch(updateLanding(landing));
    }
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(LandingPage);
