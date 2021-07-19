import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import Input from "./Input";
import "../../assets/css/login.css";
import "../../assets/css/button.css";
import Button from "./Button";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as yup from "yup";
import { uniqueId } from "lodash";

const locationSchema = yup.object().shape({
  name: yup.string().required("Location Name is required"),
  address: yup.string().required("Address is required"),
  postalcode: yup.string().required("Postal Code is required")
});

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    border: "1px solid #E6E6E6",
    boxSizing: "border-box",
    borderRadius: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));
const AddNewLocation = ({
  locations,
  setLocations,
  locationsList,
  setLocationsList,
  toggle
}) => {
  const classes = useStyles();
  const addLocation = values => {
    let loc = [...locations];
    let newloc = {
      name: values.name,
      address: values.address,
      postalcode: values.postalcode
    };
    loc.push(newloc);
    setLocations(loc);
    let listloc = [...locationsList];
    let newListLoc = { key: uniqueId(), value: values.name };
    listloc.push(newListLoc);
    setLocationsList(listloc);
    values.postalcode = "";
    values.address = "";
    values.name = "";
    toggle();
  };
  return (
    <Formik
      validationSchema={locationSchema}
      initialValues={{ name: "", address: "", postalcode: "" }}
      onSubmit={addLocation}
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
            <Container>
              <Row className="d-flex justify-content-end">
                <Col md={8} xl={6}>
                  <form className=" bg-light p-4  rounded ">
                    <div className="d-flex justify-content-between">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "22px",
                          lineHeight: "32px",

                          letterSpacing: "0.6px",

                          color: "#2B2B2B"
                        }}
                        className="  "
                      >
                        {" "}
                        Add New Location
                      </span>
                      <CloseIcon
                        onClick={toggle}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Input
                      label="Location"
                      placeholder="Location"
                      value={values.name}
                      onBlur={handleBlur("name")}
                      onChange={handleChange("name")}
                      touched={touched.name}
                      errors={errors.name}
                    />
                    <Input
                      label="Address"
                      placeholder="Address"
                      value={values.address}
                      onBlur={handleBlur("address")}
                      onChange={handleChange("address")}
                      touched={touched.address}
                      errors={errors.address}
                    />
                    <Input
                      label="Post Code"
                      placeholder="Post Code"
                      value={values.postalcode}
                      onBlur={handleBlur("postalcode")}
                      onChange={handleChange("postalcode")}
                      touched={touched.postalcode}
                      errors={errors.postalcode}
                    />

                    <div className="text-center">
                      <Button
                        text="Add"
                        width="100%"
                        onClick={handleSubmit}
                        height="3rem"
                      />
                    </div>
                  </form>
                </Col>
              </Row>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

export default AddNewLocation;
