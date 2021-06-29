import { Container, Row, Col } from "reactstrap";
import Logo from "../../assets/images/Moove-secondary-logo-black 1.png";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <p>Powered by</p>
          <img src={Logo} alt="Logo" />
          <p>Terms and Conditions | Privacy Policy</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
