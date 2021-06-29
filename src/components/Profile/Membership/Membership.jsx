import { Col, Container, Row } from "reactstrap";
import Button from "../../ui-elements/Button";
import IconButton from "../../ui-elements/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
const MemberShip = () => {
  const styles = {
    margin: "0 auto",
    marginTop: "10%",
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md="9">
            <h4 className="mt-3  text-lg-left  text-md-left text-sm-center text-center">
              Membership
            </h4>
          </Col>
          <Col md="2">
            <Button text="+ Add Membership" />
          </Col>
        </Row>
      </Container>
      <Container style={styles}>
        <Row>
          <Col className="text-center ">
            <h1>
              <PostAddIcon style={{ fontSize: "80px" }} />
            </h1>
            You don’ have any memberships <br />
            <Link to=""> Please Add Membership</Link>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="my-5   ml-2 ">
          <Col md="5 " className="shadow rounded">
            <Container className="my-5">
              <Row>
                <Col md="12 " className="   text-center ">
                  <h2 className="  ">Monthly Membership</h2>
                  <h4>£14.99/month</h4>
                </Col>
                <Col>
                  <p>
                    <CheckCircleOutlineIcon style={{ color: "blue" }} />
                    Unlimited live and on-demand classes
                  </p>
                  <p>
                    <CheckCircleOutlineIcon style={{ color: "blue" }} />
                    Access to in-person studio classes
                  </p>
                  <p>
                    <CheckCircleOutlineIcon style={{ color: "blue" }} />
                    Access to expert fitness coaches and nutritionists.
                  </p>
                </Col>
                <Col md="12">
                  <Button text="Join" width="25rem" />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MemberShip;
