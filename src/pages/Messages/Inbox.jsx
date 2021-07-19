import React from "react";
import { Row, Col } from "reactstrap";
import InboxHeader from "../../components/ui-elements/InboxHeader";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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
} from "@chatscope/chat-ui-kit-react";
import ChatImage from "../../assets/images/Ellipse 2.png";
import MessagesSearchBox from "../../components/ui-elements/SearchBoxMessages";

export default function Inbox() {
  return (
    <Row className="w-100" style={{ height: "100%" }}>
      <Col md={12} className="w-100 pb-2 " style={{ height: "91%" }}>
        <InboxHeader />
        <MainContainer responsive>
          <Sidebar position="left" scrollable={true}>
            <MessagesSearchBox />
            <ConversationList>
              <Conversation
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you"
              >
                <Avatar src={ChatImage} name="Lilly" status="available" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you"
              >
                <Avatar src={ChatImage} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Emily"
                lastSenderName="Emily"
                info="Yes i can do it for you"
                unreadCnt={3}
              >
                <Avatar src={ChatImage} name="Emily" status="available" />
              </Conversation>
              x
              <Conversation
                name="Eliot"
                lastSenderName="Eliot"
                info="Yes i can do it for you"
              >
                <Avatar src={ChatImage} name="Eliot" status="away" />
              </Conversation>
              <Conversation
                name="Zoe"
                lastSenderName="Zoe"
                info="Yes i can do it for you"
                active
              >
                <Avatar src={ChatImage} name="Zoe" status="dnd" />
              </Conversation>
              <Conversation
                name="Patrik"
                lastSenderName="Patrik"
                info="Yes i can do it for you"
              >
                <Avatar src={ChatImage} name="Patrik" status="invisible" />
              </Conversation>
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={ChatImage} name="Zoe" />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single"
                }}
              >
                <Avatar src={ChatImage} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={ChatImage} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "first"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal"
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "last"
                }}
              />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first"
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last"
                }}
              >
                <Avatar src={ChatImage} name="Zoe" />
              </Message>
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              // value={messageInputValue}
              // onChange={(val) => setMessageInputValue(val)}
              // onSend={() => setMessageInputValue("")}
            />
          </ChatContainer>
        </MainContainer>
      </Col>
    </Row>
  );
}
