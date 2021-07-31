import React from "react";
import { Container, Row, Col } from "reactstrap";
import { addPaymentMethod } from "../../../dataServices/Services";

import Button from "../../ui-elements/Button";
const Payment = () => {
  const styles = {
    margin: "0 auto",
    marginTop: "10%"
  };

  const connectStripe = async () => {
    const res = await addPaymentMethod();
    window.location = res.data.url;
    console.log(res);
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
          <Button
            text="Connect"
            width="25rem"
            height="3rem"
            onClick={connectStripe}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
