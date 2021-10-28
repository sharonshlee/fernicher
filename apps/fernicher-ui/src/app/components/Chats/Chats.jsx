import React, { useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chats.css';
import ChatFeed from './ChatFeed';
import LoginForm from './LoginForm';

const user = {password: '123123', username: 'Lewis'};

const Chats = () => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  return (
    <ChatEngine
      height="100vh"
      projectID="9663adb6-d823-4a20-935f-b7381ba20105"
      userName={username}
      userSecret={password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
  )
}

export default Chats;
