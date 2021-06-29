import "../../assets/css/login.css";
import Input from "../../components/ui-elements/Input";
import Button from "../../components/ui-elements/Button";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, CustomInput, FormGroup } from "reactstrap";
import "../../assets/css/button.css";

export default function Register() {
  const history = useHistory();

  return (
    <Container className="  my-5 ">
      <Row className="d-flex justify-content-center">
        <Col lg="5" md="7" sm="9" xs="11" className="mt-5 ">
          <form className=" bg-white p-5 ">
            <h2 className="text-center my-3"> Create an Account</h2>
            <Input label="Your Email" placeholder="forexample@gmail.com" />
            <div className="d-flex">
              {" "}
              <div>
                {" "}
                <CustomInput
                  className="mt-1"
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  label=""
                  style={{ color: "red" }}
                />
              </div>
              <div className="p-2">
                {" "}
                I confirm that I have read and agree to the{" "}
                <a href="#" style={{ fontWeight: "600", color: "#429FBA" }}>
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" style={{ fontWeight: "600", color: "#429FBA" }}>
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="text-center">
              <Button
                text="Send Me a Login Link"
                onClick={() => history.push("/login-success")}
                width="100%"
                height="2.5rem"
              />
            </div>

            <p className="text-center mt-3">
              Dont have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
