import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chat.css';

const Chat = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID="9663adb6-d823-4a20-935f-b7381ba20105"
      userName="Lewis"
      userSecret="123123"
    />
  )
}

export default Chat;
