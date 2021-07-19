import React from "react";
import { Container, Row, Col } from "reactstrap";

import Button from "../../ui-elements/Button";
const Payment = () => {
  const styles = {
    margin: "0 auto",
    marginTop: "10%"
  };
  return (
    <Container style={styles}>
      <Row>
        <Col md="12" className="text-center">
          <h4>
            <b>Payment</b>
          </h4>
          <p>
            To start earning money, you need to connect your Stripe account.
          </p>
        </Col>
        <Col md="12" className="text-center">
          <Button text="Connect" width="25rem" height="3rem" />
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
