import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  CustomInput,
  Label
} from "reactstrap";
import Input from "../../../components/ui-elements/Input";
import ImageUpload from "../../../components/ui-elements/ImageUpload";
import DorpDown from "../../../components/ui-elements/DropDown";
import Button from "../../../components/ui-elements/Button";

import Tags from "../../../components/ui-elements/Tags";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BackButton from "../../../components/ui-elements/BackButton";
import { useHistory } from "react-router-dom";
import UploadedImage from "../../../components/ui-elements/UploadedImage";
import { Formik } from "formik";
import * as yup from "yup";
import { isEmpty, get } from "lodash";
import { updateImage } from "../../../dataServices/Services";
import { useAlert } from "react-alert";
import { addClassRoom } from "../../../dataServices/Services";
import ApiLoader from "../../../components/ui-elements/ApiLoader";
import RadioButton from "../../../components/ui-elements/RadioButton";
import { updateUserVideo } from "../../../dataServices/Services";
import { getVideos } from "../../../redux/selectors";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { formatBytes } from "../../../config/GlobalFunctions";
import UploadedVideo from "../../../components/ui-elements/UploadedVideo";

const videoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  notes: yup.string().required("Notes is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Enter Price in numbers")
});

const EditVideo = ({ videos }) => {
  const alert = useAlert();
  const { id } = useParams();
  const history = useHistory();
  const [categoryTags, setCategoryTags] = useState(["TALKS", "Nutrition"]);
  const [visibility, setVisibility] = useState("Publish");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [singleVideo, setSingleVideo] = useState();
  const [videoSize, setVideoSize] = useState("");
  const [videoName, setVideoName] = useState("");
  const [imageSize, setImageSize] = useState("");
  const [imageName, setImageName] = useState("");
  const [loadingVideo, setLoadingVideo] = React.useState(false);
  const [loadingImage, setLoadingImage] = React.useState(false);

  const getSingleVideo = () => {
    if (!isEmpty(videos)) {
      let singlev = videos.filter(video => video._id === id);

      setSingleVideo(singlev[0]);
      let cat = [...selectedCategory];
      cat.push(singlev[0].category);
      setSelectedCategory(cat);
      setVisibility(singlev[0].visibility);
      setVideo(singlev[0].videoURL);
      setCoverImage(singlev[0].coverImage);
      setVideoSize(singlev[0].videoDetails.size);
      setVideoName(singlev[0].videoDetails.name);
      setImageSize(singlev[0].imageDetails.size);
      setImageName(singlev[0].imageDetails.name);
    } else {
      alert.error("Error.Network Error or No Video exist.");
    }
  };

  const uploadCoverImage = async acceptedFiles => {
    setLoadingImage(true);
    const size = formatBytes(acceptedFiles[0].size);
    setImageSize(size);
    setImageName(acceptedFiles[0].name);
    let url = URL.createObjectURL(acceptedFiles[0]);

    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingImage(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoadingImage(false);
      setCoverImage(res.data.imageUrl);
      alert.success("Cover Image Added");
    }
  };

  const videoUpload = async acceptedFiles => {
    setLoadingVideo(true);
    const size = formatBytes(acceptedFiles[0].size);
    setVideoSize(size);
    setVideoName(acceptedFiles[0].name);
    let url = URL.createObjectURL(acceptedFiles[0]);

    let blob = await fetch(url).then(r => r.blob());
    const formData = new FormData();

    formData.append("image", blob);

    const res = await updateImage(formData);
    console.log(res);
    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoadingVideo(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoadingVideo(false);
      setVideo(res.data.imageUrl);
      alert.success("Video Added");
    }
  };
  const updateVideo = async values => {
    setLoading(true);
    const imageDetails = {
      name: imageName,
      size: imageSize
    };
    const videoDetails = {
      name: videoName,
      size: videoSize
    };
    const data = {
      title: values.title,
      description: values.description,

      price: values.price,
      videoURL: video,

      notes: values.notes,

      visibility: visibility,
      coverImage: coverImage,
      category: selectedCategory[0],
      videoDetails: videoDetails,
      imageDetails: imageDetails
    };
    const res = await updateUserVideo(id, data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);
      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);
      alert.success("Video Updated Successfully.");
    }
  };

  React.useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <Formik
      initialValues={{
        title: singleVideo && singleVideo.title,
        description: singleVideo && singleVideo.description,
        notes: singleVideo && singleVideo.notes,
        price: singleVideo && singleVideo.price
      }}
      validationSchema={videoSchema}
      enableReinitialize={true}
      onSubmit={values => {
        if (isEmpty(selectedCategory) || coverImage === "" || video === "") {
          setClicked(true);
        } else {
          updateVideo(values);
        }
      }}
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
            <BackButton
              title="Back to videos"
              onClick={() => history.push("/videos")}
            />
            <Container className="text-center">
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <h3>Edit Video</h3>
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
                          placeholder="Enter your Video Name"
                          backgroundColor
                          value={values.title}
                          onBlur={handleBlur("title")}
                          onChange={handleChange("title")}
                          touched={touched.title}
                          errors={errors.title}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Description"
                          type="textarea"
                          placeholder="Details about your Video"
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

                      {/* <Col md={{ size: 0 }} className="mt-4">
                            <AttachMoneyIcon />
                        </Col> */}
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label="Price "
                          type="text"
                          placeholder="1234"
                          color="white"
                          height="50px"
                          backgroundColor
                          value={values.price}
                          onBlur={handleBlur("price")}
                          onChange={handleChange("price")}
                          touched={touched.price}
                          errors={errors.price}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Category</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Tags
                          tags={categoryTags}
                          selectedTags={selectedCategory}
                          setSelectedTags={setSelectedCategory}
                          setTags={setCategoryTags}
                          newTag
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          type="textarea"
                          label={`Notes`}
                          color="white "
                          placeholder="Enter Notes"
                          height="80px"
                          backgroundColor
                          value={values.notes}
                          onBlur={handleBlur("notes")}
                          onChange={handleChange("notes")}
                          touched={touched.notes}
                          errors={errors.notes}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Video file"
                          setSelectedFiles={videoUpload}
                          video
                          loadingFile={loadingVideo}
                        />
                        {clicked && video === "" && (
                          <div className="text-danger">Video is required</div>
                        )}
                        {video !== "" && (
                          <UploadedVideo name={videoName} size={videoSize} />
                        )}
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text="Cover image"
                          setSelectedFiles={uploadCoverImage}
                          loadingFile={loadingImage}
                        />
                        {coverImage !== "" && (
                          <UploadedImage
                            url={coverImage}
                            name={imageName}
                            size={imageSize}
                          />
                        )}
                        {clicked && coverImage === "" && (
                          <div className="text-danger">
                            Cover Image is required
                          </div>
                        )}
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Visibility</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }} className="mt-3">
                        <Row className="pl-3">
                          <RadioButton
                            label="Draft"
                            value={visibility}
                            setValue={setVisibility}
                          />
                          <RadioButton
                            label="Publish"
                            value={visibility}
                            setValue={setVisibility}
                          />
                        </Row>
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
        );
      }}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    videos: getVideos(state)
  };
};

export default connect(mapStateToProps, null)(EditVideo);
