import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Logo from '../../assets/images/Logo.jpeg'
const Header = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md='12'>
            <p
              style={{
                fontFamily: 'fantasy',
                fontSize: 25,
                fontWeight: 'bold'
              }}
            >
              Pack and Go
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header
