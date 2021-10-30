import React, { useState, useContext, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chats.css';
import ChatFeed from './ChatFeed';
import { LoggedInContext } from '../../providers/LoggedInContext';
import { Redirect } from 'react-router-dom';

const Chats = () => {
  const { state } = useContext(LoggedInContext);

  if (!state) return <Redirect to="/" />;
  console.log('STATE: ', state);

  return (
    <ChatEngine
      height="100vh"
      projectID="9663adb6-d823-4a20-935f-b7381ba20105"
      userName={state.email}
      userSecret={state.password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default Chats;
