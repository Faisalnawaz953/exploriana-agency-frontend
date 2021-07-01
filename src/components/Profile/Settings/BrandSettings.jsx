import React from "react";
import { Container, Row, Col, FormGroup, Label, Form } from "reactstrap";
import ProfilePic from "../../../assets/images/Ellipse22.png";
import Input from "../../ui-elements/Input";
import DropDown from "../../ui-elements/DropDown";
import Button from "../../ui-elements/Button";
import BrandColorTheme from "../../ui-elements/BrandColorTheme";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BottomNavigation } from "@material-ui/core";
import EditImage from "../../ui-elements/EditImage";
import { Formik } from "formik";
import * as yup from "yup";
import { useAlert } from "react-alert";
import { addBrand } from "../../../dataServices/Services";
import get from "lodash/get";
import ApiLoader from "../../ui-elements/ApiLoader";

const schema = yup.object().shape({
  brandName: yup.string().required("Brand Name is Required"),
});

const useStyles = makeStyles((theme) => ({
  headText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    /* identical to box height, or 150% */

    letterSpacing: "0.6px",

    color: "#2B2B2B",
  },
}));
const BrandSettings = () => {
  const classes = useStyles();
  const alert = useAlert();
  const [currency, setCurrency] = React.useState("ind");
  const [colorCode, setColorCode] = React.useState("#F2453D");
  const [brandImage, setBrandImage] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const option = [
    { key: "option-1", value: "ind" },
    { key: "option-2", value: "rs" },
  ];

  const submitHandler = async (values) => {
    //TODO
    // uploadImage()
    setLoading(true);
    const data = {
      brandLogoUrl: "Brand logo url",
      brandName: values.brandName,
      colorCodeHex: colorCode,
    };
    //TODO
    // uploadImage()

    const res = await addBrand(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      setLoading(false);

      alert.success("Brand Changes Saved SuccessFully");
    }
  };

  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage path={brandImage} setPath={setBrandImage} />
            </Col>
          </Row>
        </Form>
      </Container>

      <Formik
        initialValues={{
          brandName: "",
        }}
        validationSchema={schema}
        onSubmit={submitHandler}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          values,
          touched,
          handleSubmit,
        }) => (
          <Container>
            <Form>
              <Row>
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
                    <Col md={{ size: "7", offset: 3 }}>
                      <FormGroup>
                        <Input
                          type="text"
                          label="Brand Name"
                          placeholder="John"
                          height={"50px"}
                          value={values.brandName}
                          onBlur={handleBlur("brandName")}
                          onChange={handleChange("brandName")}
                          touched={touched.brandName}
                          errors={errors.brandName}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: "7", offset: 3 }}>
                      <FormGroup>
                        <DropDown
                          type="select"
                          options={option}
                          label="Currency"
                          height={"50px"}
                          value={currency}
                          setValue={setCurrency}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: "8", offset: 3 }}>
                      <BrandColorTheme
                        brandColor={colorCode}
                        setBrandColor={(val) => setColorCode(val)}
                      />
                    </Col>
                  </>
                )}

                <Col md={{ size: 7, offset: 3 }} className="text-center">
                  <Button
                    text="Save Changes"
                    width="100%"
                    height="2.5rem"
                    onClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default BrandSettings;
