import React from 'react'
import { Container, Row, Col, CustomInput, FormGroup } from 'reactstrap'
import Input from './Input'
import '../../assets/css/login.css'
import '../../assets/css/button.css'
import Button from './Button'
import CloseIcon from '@material-ui/icons/Close'
import {
  createChatRoom,
  sendMessageInChatRoom
} from '../../dataServices/ChatService'

export default function MessageModal({ onClose, sender, receiver }) {
  const [message, setMessage] = React.useState('')

  const sendMessageHandler = async text => {
    console.log('text :', text)
    const participants = [sender, receiver]
    const res = await createChatRoom(participants)
    console.log('createroom :', res)
    if (res.success && res.chatRoom) {
      const messageRes = await sendMessageInChatRoom(
        res.chatRoom?._id,
        message,
        sender?._id
      )
      console.log('message res :', messageRes)
      if (messageRes.success) {
        setMessage('')
        onClose()
        alert('Message sent successfully')
      } else {
        alert('Error sending message')
      }
    }
  }
  return (
    <Container>
      <Row className='d-flex justify-content-center mb-5 '>
        <Col md='12' className='mt-2 '>
          <form className=' bg-light p-4 rounded '>
            <div className='d-flex justify-content-between'>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '22px',
                  lineHeight: '32px',

                  letterSpacing: '0.6px',

                  color: '#2B2B2B'
                }}
                className='  '
              >
                {' '}
                Create Message
              </span>
              <CloseIcon onClick={onClose} />
            </div>
            <Input
              backgroundColor
              label='Who'
              value={receiver?.email}
              placeholder='Name'
            />
            <Input
              type='textarea'
              label='Message'
              placeholder='Details about your membership '
              backgroundColor
              value={message}
              onChange={e => setMessage(e.target.value)}
            />

            <div className='text-center'>
              <Button
                text='Send'
                width='100%'
                height='2.5rem'
                onClick={sendMessageHandler}
              />
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
