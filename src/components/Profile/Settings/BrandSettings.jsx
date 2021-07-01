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
const schema = yup.object().shape({
  brandLogoUrl: yup.string().required(),
  brandName: yup.string().required(),
  colorCodeHex: yup.string().required(),
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
  const option = [
    { key: "option-1", value: "ind" },
    { key: "option-2", value: "rs" },
  ];

  const submitHandler = (data) => {
    //TODO
    // uploadImage()
    console.log(data);
    addBrand(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert.error("Network Error Try Agian");
      });
  };

  return (
    <>
      <Container className="text-center">
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage />
            </Col>
          </Row>
        </Form>
      </Container>

      <Formik
        initialValues={{
          brandLogoUrl:
            "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg",
          colorCodeHex: "#028af4",
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
                      // onChange={handleChange("gender")}
                    />
                  </FormGroup>
                </Col>

                <Col md={{ size: "8", offset: 3 }}>
                  <BrandColorTheme />
                </Col>

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
