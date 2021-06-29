import { Container, Row, Col } from "reactstrap";
// import React, { lazy, Suspense } from "react";
import { useHistory, Link } from "react-router-dom";
import Input from "../../components/ui-elements/Input";
import "../../assets/css/button.css";
import "../../assets/css/login.css";
import Button from "../../components/ui-elements/Button";

const LetsGetKnow = () => {
  const history = useHistory();
  return (
    <Container className="  my-5 ">
      <Row className="d-flex justify-content-center">
        <Col lg="5" md="7" sm="9" xs="11" className="mt-5 ">
          <form className=" bg-white p-5 ">
            <h2 className="text-center my-3"> Let’s get to know you</h2>
            <Input label="First Name" placeholder="First Name" />
            <Input label="Last Name" placeholder="Last Name" />
            <div className="text-center">
              <Button
                onClick={() => history.push("login-success")}
                text={"Save"}
                width="100%"
                height="2.5rem"
              />{" "}
            </div>

            <p className="text-center mt-3">
              Dont have an account? <Link to="register">Sign Up</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LetsGetKnow;
