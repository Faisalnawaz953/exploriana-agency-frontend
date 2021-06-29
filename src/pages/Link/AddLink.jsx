import React from "react";
import BackButton from "../../components/ui-elements/BackButton";
import { Row, Col } from "reactstrap";
import Input from "../../components/ui-elements/Input";
import Button from "../../components/ui-elements/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontStyle: " normal",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "32px",

    textAlign: "center",
    letterSpacing: "0.6px",

    color: "#2B2B2B",
  },
}));
export default function Link() {
  const history = useHistory();
  const classes = useStyles();
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
            <Col xl={10} lg={10} md={12} sm={12}>
              <Input
                label="Link Name"
                backgroundColor
                placeholder="Enter your Link Name"
              />
            </Col>
            <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
              <Input label="URL" backgroundColor placeholder="Paste your URL" />
            </Col>
            <Col xl={10} lg={10} md={12} sm={12} className="mt-3">
              <Button text="Add Link" width="100%" height="2.5rem" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
