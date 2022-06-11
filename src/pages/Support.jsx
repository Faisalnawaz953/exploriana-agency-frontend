import React from "react"
import { Container, Row, Col } from "reactstrap"

const Support = ({ user }) => {
  const styles = {
    margin: "0 auto",
    marginTop: "10%"
  }

  return (
    <Container style={styles}>
      <Row>
        <Col md="12" className="text-center">
          <h4>
            <b>Support</b>
          </h4>
          <p>
            In App Support is not Supported Yet Email your queries at{" "}
            <b>packandgo.suport@gmail.com</b>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Support
