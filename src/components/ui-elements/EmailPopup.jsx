import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Button from './Button'
import pic from '../../assets/images/Ellipse 2.png'
import { isEmpty } from 'lodash'
import { getAllUsers } from '../../dataServices/Services'

export default function EmailPopup({ notifications }) {
  // console.log(notifications)
  const [users, setUsers] = React.useState([])
  const loadAllUsers = async () => {
    const res = await getAllUsers()

    setUsers(res.data.users)
  }
  React.useEffect(() => {
    loadAllUsers()
  }, [])
  React.useEffect(() => {}, [users])

  const showUserImage = notification => {
    let user = users.filter(user => notification.userId === user._id)
    console.log('usersssss', user[0]?.coverImageUrl)
    return user[0]?.coverImageUrl ? user[0]?.coverImageUrl : pic
  }

  return (
    <>
      <Row className='d-flex justify-content-center'>
        <Col md='12' className='mt-3 '>
          <form
            style={{
              backgroundColor: 'white',
              boxShadow: '2px 2px 8px 8px #f5f5f5'
            }}
            className='border'
          >
            <div className='d-flex justify-content-between align-items-center p-2'>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  lineHeight: '32px',
                  transition: '1s',
                  letterSpacing: '0.6px',

                  color: '#2B2B2B'
                }}
                className='  '
              >
                {' '}
                Notifications (4)
              </span>
              <div style={{ color: '#429FBA', cursor: 'pointer' }}>
                Mark all as read
              </div>
            </div>
            <div
              style={{
                height: '290px',
                overflowY: 'scroll',
                overflowX: 'hidden'
              }}
            >
              {isEmpty(notifications) ? (
                <div
                  style={{
                    width: '100%'
                  }}
                  className='  text-dark d-flex justify-content-between align-items-center p-4'
                >
                  <div>
                    <h4>No Notification to show</h4>
                  </div>
                </div>
              ) : (
                notifications.map((notification, i) => (
                  <div
                    style={{
                      maxWidth: '100%',
                      backgroundColor: 'rgb(66, 159, 186,0.1)',
                      width: '290px'
                    }}
                    className='  text-dark d-flex justify-content-between align-items-center p-2'
                  >
                    <img
                      src={showUserImage(notification)}
                      alt='img'
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%'
                      }}
                    />
                    <div>
                      {notification.body.title} <br />
                      <span style={{ fontSize: '12px' }}>
                        {notification.body.description}
                      </span>
                    </div>
                    10 min
                  </div>
                ))
              )}
            </div>
          </form>
        </Col>
      </Row>
    </>
  )
}
