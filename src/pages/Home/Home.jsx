import React from 'react'
import { Row, Col } from 'reactstrap'
import * as classes from '../../css/Home.module.css'
import { useAlert } from 'react-alert'
import { connect } from 'react-redux'
import { getUserAuth } from '../../redux/selectors'
import { getAllChatRoomsByUserId } from '../../dataServices/ChatService'
import {
  requestFirebaseNotificationPermission,
  messaging
} from '../../firebase'
import { updateFirebaseToken } from '../../dataServices/Services'

const Home = ({ auth }) => {
  const alert = useAlert()
  const editFirebaseToken = () => {
    requestFirebaseNotificationPermission()
      .then(async (firebaseToken) => {
        // eslint-disable-next-line no-console
        console.log(firebaseToken)
        // setDeviceToken(firebaseToken);
        let body = {
          deviceToken: firebaseToken
        }
        const res = await updateFirebaseToken(body)
        console.log(res)
      })
      .catch((err) => {
        console.log('Error ===========> ', err)
        return err
      })
  }
  React.useEffect(() => {
    editFirebaseToken()
  }, [])
  return (
    <Row className='w-100  align-items-center justify-content-center '>
      <Col sm={12} md={12} lg={8} xl={6} className={'pt-4'}>
        <div
          className={`p-3  d-flex justify-content-center flex-column w-100 ${classes.parent}`}
        >
          <p className={classes.start}>Get started</p>
          <div>
            <p className={classes.headText}>Your Studio </p>
            <p>
              <a href='#' style={{ color: '#429FBA', lineHeight: '25px' }}>
                https://www.exploriana.com/brandname
              </a>
            </p>
          </div>
          <Row className='d-flex w-100 align-items-center'>
            <Col md={6}>
              <p className={classes.headText}>Complete profile</p>
              <p className={classes.text}>Edit profile</p>
            </Col>
            <Col md={6}>
              <p className={classes.headText}>Branding</p>
              <p className={classes.text}>Customise</p>
            </Col>
          </Row>
          <div>
            <p className={classes.headText}>Payment provider: Missing</p>
            <p className={classes.text}>Connect payment</p>
          </div>
          <div>
            <p className={classes.headText}>Add first on demand activity</p>
            <div className='d-flex'>
              <p className={classes.text}>Add class</p>
              <p className={`${classes.text} pl-5`}>Add video</p>
            </div>
          </div>
          <div>
            <p className={classes.headText}>Schedule class</p>
            <p className={classes.text}>Add class</p>
          </div>{' '}
          <Row className='d-flex w-100 align-items-center'>
            <Col md={6}>
              <p className={classes.headText}>Create membership</p>
              <p className={classes.text}>Add membership</p>
            </Col>
            <Col md={6}>
              <p className={classes.headText}>Your Website</p>
              <p className={classes.text}>Set up your website</p>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}
const mapStateToProps = (state) => {
  return {
    auth: getUserAuth(state)
  }
}

export default connect(mapStateToProps, null)(Home)
