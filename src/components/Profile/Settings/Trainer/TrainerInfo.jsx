import React from 'react'
import ProfilePic from '../../../../assets/images/Ellipse22.png'
import { Container, Col, Row, FormGroup, Form } from 'reactstrap'
import Input from '../../../ui-elements/Input'
import Button from '../../../ui-elements/Button'
import ImageUpload from '../../../ui-elements/ImageUpload'
import { useHistory } from 'react-router-dom'
import BackButton from '../../../ui-elements/BackButton'
import TrainerReviews from '../../../TrainerReviews'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { BottomNavigation } from '@material-ui/core'
import EditImage from '../../../ui-elements/EditImage'

const useStyles = makeStyles((theme) => ({
  headText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    /* identical to box height, or 150% */

    letterSpacing: '0.6px',

    color: '#2B2B2B'
  }
}))

const TrainerInfo = () => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <>
      <BackButton
        title='Back to Users'
        onClick={() => history.push('/profile')}
      />
      <Container>
        <Row className='text-center'>
          <Col md={{ size: 12 }}>
            <div className={classes.headText}>User Info</div>
            <EditImage />
          </Col>
        </Row>
      </Container>
      <Container>
        <Form>
          <Row form>
            <Col md={{ size: '4', offset: 2 }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  type='text'
                  label='First Name'
                  placeholder='Enter First Name'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: '4' }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  type='text'
                  label='Last Name'
                  placeholder='Enter Last Name'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input
                  height={'80px'}
                  label='About'
                  type='textarea'
                  placeholder='Details about User'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  label='Email'
                  type='email'
                  placeholder='Enter User Email'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <h6>
                <b>Social media links:</b>
              </h6>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  label='Instagram'
                  type='text'
                  placeholder='Enter User instagram'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  label='Facebook'
                  type='text'
                  placeholder='Enter User Facebook'
                />
              </FormGroup>
            </Col>
            <Col md={{ size: 8, offset: 2 }}>
              <FormGroup>
                <Input
                  height={'50px'}
                  label='Twitter'
                  type='text'
                  placeholder='Enter User Twitter'
                />
              </FormGroup>
            </Col>

            <Col
              md={{ size: 8, offset: 2 }}
              className='text-center'
              className='mb-5'
            >
              <Button text='Message' width='100%' height='2.5rem' />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default TrainerInfo
