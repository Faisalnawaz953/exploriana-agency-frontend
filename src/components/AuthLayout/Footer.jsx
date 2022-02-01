import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Logo from '../../assets/images/Moove-secondary-logo-black 1.png'

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className='text-center'>
          <p>Powered by</p>
          <p
            style={{
              fontFamily: 'fantasy',
              fontSize: 25,
              fontWeight: 'bold'
            }}
          >
            Pack and Go
          </p>
          <p>Terms and Conditions | Privacy Policy</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
