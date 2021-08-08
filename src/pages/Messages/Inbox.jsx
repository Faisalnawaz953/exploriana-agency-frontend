/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import InboxHeader from '../../components/ui-elements/InboxHeader'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
  Search,
  Sidebar,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator
} from '@chatscope/chat-ui-kit-react'
import ChatImage from '../../assets/images/Ellipse 2.png'
import MessagesSearchBox from '../../components/ui-elements/SearchBoxMessages'
import { updateChatRooms } from '../../redux/actions/userActions/userActions'
import {
  getAllChatRoomsByUserId,
  sendMessageInChatRoom,
  readAllUnseenMessages
} from '../../dataServices/ChatService'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

function Inbox({ loggedUser, chatRooms, updateChatRooms }) {
  const [selectedChatRoom, setSelectedChatRoom] = React.useState(null)
  const [messageText, setMessageText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (
      loggedUser?.user &&
      selectedChatRoom?.messages[selectedChatRoom.messages.length - 1]
        .senderId !== loggedUser?.user._id &&
      selectedChatRoom?.messages[selectedChatRoom.messages.length - 1].seen ===
        false
    ) {
      console.log('should call api to read all messages')
      readAllChatMessages(selectedChatRoom._id)
    }
  }, [selectedChatRoom])
  const getChatRooms = async () => {
    setLoading(true)
    const res = await getAllChatRoomsByUserId(loggedUser?.user?._id)
    if (res.success) {
      setLoading(false)
      console.log('chays', res.chatRooms)
      updateChatRooms(res.chatRooms)
    } else {
      setLoading(false)
    }
  }

  const getTotalUnreadMessagesCount = messages => {
    const unread = messages.filter(
      mess => mess.seen === false && mess.senderId !== loggedUser?.user._id
    )
    if (messages[messages.length - 1].senderId !== loggedUser?.user._id) {
      return unread.length === 0 ? ' ' : unread.length
    } else {
      return ''
    }
  }

  const readAllChatMessages = async rid => {
    const readAllMessReq = await readAllUnseenMessages(rid)
    getChatRooms()
    console.log('read', readAllMessReq)
  }
  const sendMessageButtonHandler = async e => {
    if (messageText === '') {
      return
    }
    const messageRes = await sendMessageInChatRoom(
      selectedChatRoom._id,
      messageText,
      loggedUser?.user?._id
    )
    console.log('message res :', messageRes)
    if (messageRes.success) {
      setMessageText('')
      setSelectedChatRoom(messageRes.chatRoom)
      // scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      getChatRooms()
    } else {
      alert('Error sending message')
    }
  }

  const showUserImage = participants => {
    let part = participants.filter(part => part._id !== loggedUser?.user?._id)
    console.log('usersssss', part[0]?.coverImageUrl)
    return part[0]?.coverImageUrl ? part[0]?.coverImageUrl : ChatImage
  }

  React.useEffect(() => {
    getChatRooms()
  }, [])
  return (
    <Row className='w-100' style={{ height: '100%' }}>
      <Col md={12} className='w-100 pb-2 ' style={{ height: '80%' }}>
        <InboxHeader />
        <MainContainer responsive>
          <Sidebar position='left' scrollable={true}>
            <MessagesSearchBox />
            <ConversationList loading={loading}>
              {!isEmpty(chatRooms) &&
                chatRooms.map((chatRoom, i) => (
                  <Conversation
                    active={
                      selectedChatRoom && selectedChatRoom._id === chatRoom._id
                    }
                    unreadCnt={
                      getTotalUnreadMessagesCount(chatRoom.messages) !== '' &&
                      getTotalUnreadMessagesCount(chatRoom.messages)
                    }
                    name={
                      chatRoom.participants[0]._id === loggedUser?.user?._id
                        ? chatRoom.participants[1].firstName
                        : chatRoom.participants[0].firstName
                    }
                    lastSenderName={
                      chatRoom.participants[0]._id === loggedUser?.user?._id
                        ? 'You'
                        : chatRoom.participants[0].firstName
                    }
                    info={
                      chatRoom.messages.length > 0
                        ? chatRoom.messages[chatRoom.messages.length - 1]?.body
                            ?.value
                        : ''
                    }
                    onClick={() => setSelectedChatRoom(chatRoom)}
                  >
                    <Avatar
                      src={
                        chatRoom.participants[0]._id === loggedUser?.user?._id
                          ? chatRoom.participants[1].coverImageUrl
                            ? chatRoom.participants[1].coverImageUrl
                            : ChatImage
                          : chatRoom.participants[0].coverImageUrl
                          ? chatRoom.participants[0].coverImageUrl
                          : ChatImage
                      }
                      name={
                        chatRoom.participants[0]._id === loggedUser?.user?._id
                          ? chatRoom.participants[1].firstName
                          : chatRoom.participants[0].firstName
                      }
                    />
                  </Conversation>
                ))}
            </ConversationList>
          </Sidebar>
          <div
            style={{
              maxHeight: '600px',
              width: '100%'
            }}
          >
            {selectedChatRoom ? (
              <ChatContainer>
                <ConversationHeader>
                  <ConversationHeader.Back />
                  <Avatar
                    src={
                      selectedChatRoom.participants[0]._id ===
                      loggedUser?.user?._id
                        ? selectedChatRoom.participants[1].coverImageUrl
                          ? selectedChatRoom.participants[1].coverImageUrl
                          : ChatImage
                        : selectedChatRoom.participants[0].coverImageUrl
                        ? selectedChatRoom.participants[0].coverImageUrl
                        : ChatImage
                    }
                    name={
                      selectedChatRoom.participants[0]._id ===
                      loggedUser?.user?._id
                        ? selectedChatRoom.participants[1].firstName
                        : selectedChatRoom.participants[0].firstName
                    }
                  />
                  <ConversationHeader.Content
                    userName={
                      selectedChatRoom.participants[0]._id ===
                      loggedUser?.user?._id
                        ? selectedChatRoom.participants[1].firstName
                        : selectedChatRoom.participants[0].firstName
                    }
                    // info='Active 10 mins ago'
                  />
                </ConversationHeader>
                <MessageList
                // typingIndicator={<TypingIndicator content='Zoe is typing' />}
                >
                  {/* <MessageSeparator content='Saturday, 30 November 2019' /> */}

                  {selectedChatRoom?.messages.map(message => (
                    <Message
                      model={{
                        message: message.body.value,
                        sentTime: '15 mins ago',
                        sender:
                          selectedChatRoom.participants[0]._id ===
                          loggedUser?.user?._id
                            ? selectedChatRoom.participants[1].firstName
                            : selectedChatRoom.participants[0].firstName,
                        direction:
                          message.senderId === loggedUser?.user?._id
                            ? 'outgoing'
                            : 'incoming',
                        position: 'last'
                      }}
                    >
                      <Avatar
                        src={
                          message.senderId === loggedUser?.user?._id
                            ? loggedUser?.user?.coverImageUrl
                              ? loggedUser?.user?.coverImageUrl
                              : ChatImage
                            : showUserImage(selectedChatRoom.participants)
                        }
                        name={
                          selectedChatRoom.participants[0]._id ===
                          loggedUser?.user?._id
                            ? selectedChatRoom.participants[0].firstName
                            : selectedChatRoom.participants[1].firstName
                        }
                      />
                    </Message>
                  ))}
                </MessageList>
                <MessageInput
                  placeholder='Type message here'
                  value={messageText}
                  onChange={val => setMessageText(val)}
                  onSend={sendMessageButtonHandler}
                  attachButton={false}
                  autoFocus
                />
              </ChatContainer>
            ) : (
              <div className='h-2 text-center d-flex align-items-center justify-content-center h-100 w-100'>
                <h3 className='h-3'>Select Chat Room to Send Message</h3>
              </div>
            )}
          </div>
        </MainContainer>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => {
  return {
    chatRooms: state.user.chatRooms,
    loggedUser: state.user
  }
}

const matchDispatchToProps = dispatch => {
  return {
    updateChatRooms: chatRooms => {
      dispatch(updateChatRooms(chatRooms))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Inbox)
