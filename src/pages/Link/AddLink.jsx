import React from "react";
import BackButton from "../../components/ui-elements/BackButton";
import { Row, Col } from "reactstrap";
import Input from "../../components/ui-elements/Input";
import Button from "../../components/ui-elements/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { isEmpty, get } from "lodash";
import { useAlert } from "react-alert";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import { addLink } from "../../dataServices/Services";

const linkSchema = yup.object().shape({
  linkName: yup.string().required("Link Name is required"),
  url: yup.string().required("Url is required")
});

const useStyles = makeStyles(theme => ({
  heading: {
    fontStyle: " normal",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "32px",

    textAlign: "center",
    letterSpacing: "0.6px",

    color: "#2B2B2B"
  }
}));
export default function Link() {
  const alert = useAlert();
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const uploadLink = async values => {
    setLoading(true);
    const data = {
      linkName: values.linkName,
      url: values.url
    };
    const res = await addLink(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      values.linkName = "";
      values.url = "";
      setLoading(false);
      alert.success("Link Added SuccessFully");
    }
  };
  return (
    <Formik
      initialValues={{ linkName: "", url: "" }}
      validationSchema={linkSchema}
      onSubmit={uploadLink}
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
          <div>
            <BackButton
              title={"Back to links"}
              onClick={() => {
                history.push("/link");
              }}
            />
            <Row className="d-flex justify-content-center w-100 align-items-center pt-5 ">
              <Col xl={7} lg={8} sm={12} md={8}>
                <div className="text-center">
                  <p className={classes.heading}>Add Link</p>
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
                          label="Link Name"
                          backgroundColor
                          placeholder="Enter your Link Name"
                          value={values.linkName}
                          onBlur={handleBlur("linkName")}
                          onChange={handleChange("linkName")}
                          touched={touched.linkName}
                          errors={errors.linkName}
                        />
                      </Col>
                      <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                        <Input
                          label="URL"
                          backgroundColor
                          placeholder="Paste your URL"
                          value={values.url}
                          onBlur={handleBlur("url")}
                          onChange={handleChange("url")}
                          touched={touched.url}
                          errors={errors.url}
                        />
                      </Col>
                    </>
                  )}
                  <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
                    <Button
                      text="Add Link"
                      width="100%"
                      onClick={handleSubmit}
                      height="2.5rem"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        );
      }}
    </Formik>
  );
}
