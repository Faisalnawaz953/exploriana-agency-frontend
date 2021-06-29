import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import "../../assets/css/login.css";
import { Container, Row, Col } from "reactstrap";
import Button from "../../components/ui-elements/Button";
const LoginSuccess = () => {
  const iconStyle = { fontSize: "70px", color: "#429FBA" };
  return (
    <>
      {" "}
      <Container className="  my-5 ">
        <Row className="d-flex justify-content-center">
          <Col lg="5" md="7" sm="9" xs="11" className="mt-5 ">
            <form
              className=" bg-white p-5  text-center"
              action="https://mail.google.com/mail/u/1/#inbox"
            >
              <CheckCircleOutlineOutlinedIcon style={iconStyle} />

              <h2 className=" mt-3">Login link sent</h2>
              <p> Please check your email inbox for your login link.</p>
              <Button text={"OK"} width="100%" height="2.5rem" />
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginSuccess;
