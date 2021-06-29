import { Container, Row, Col } from "reactstrap";
import Logo from "../../assets/images/Moove-secondary-logo-black 1.png";
const Header = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="12">
            <img src={Logo} alt="Logo" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
