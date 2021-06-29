import { Container, Row, Col } from "reactstrap";
import React, { lazy } from "react";
import { useHistory, Link } from "react-router-dom";
import "../assets/css/button.css";

const MainForm = ({ heading, label }) => {
  const Input = lazy(() => import("./ui-elements/Input"));
  const Button = lazy(() => import("./ui-elements/Button"));
  const history = useHistory();

  return (
    <Container className="  my-5 ">
      {/* <Row className="d-flex justify-content-center">
                <Col md="5 " className="mt-5 ">
                    <form className=" bg-white p-5 " heading="Sign In" action="">
                        <h2 className="text-center my-3"> {heading}</h2>
                        <Input label="Your Email" placeholder="forexample@gmail.com" />
                        <Button className="custom_buttom_design" onClick={() => history.push("login-success")} text={'Send Me a Login Link'} > send me a login  link</Button>
                        

                        <p className="text-center mt-3">Dont have an account? <Link to="register">Sign Up</Link></p>
                    </form>
                </Col>
            </Row> */}
    </Container>
  );
};

export default MainForm;
