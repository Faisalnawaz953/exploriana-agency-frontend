import { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import SingleEmailNotification from "../../ui-elements/SingleEmailNotification";
import Notification from "../../ui-elements/Notification";
import Button from "../../ui-elements/Button";

const EmailNotification = () => {
  const [email, setEmail] = useState(Notification);
  return (
    <>
      <Container className="text-center">
        <Row>
          <Col md={{ size: 12 }}>
            <p
              style={{
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "30px",

                letterSpacing: "0.6px",

                color: "#2B2B2B",
              }}
            >
              Email notifications
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            {email.map((SingleEmailNotifications) => {
              return (
                <SingleEmailNotification
                  key={SingleEmailNotifications.id}
                  {...SingleEmailNotifications}
                />
              );
            })}
          </Col>
          <Col md={{ size: 8, offset: 2 }}>
            <Button text="Save Changes " width="100%" height="2.5rem" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmailNotification;
