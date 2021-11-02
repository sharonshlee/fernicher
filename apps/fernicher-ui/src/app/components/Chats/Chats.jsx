import React, { useState, useContext, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chats.css';
import ChatFeed from './ChatFeed';
import { LoggedInContext } from "../../providers/LoggedInContext";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { set } from 'lodash';


const Chats = (props) => {
  const items = useContext(LoggedInContext);
  const [newChat] = useState(props.location.state ? props.location.state : null);

  useEffect(() => {
    if (newChat) {
      const username = newChat.email;
      const body = {
        usernames: [username],
        title: username,
        is_direct_chat: true
      }
      const headers = {
        'Project-ID': '9663adb6-d823-4a20-935f-b7381ba20105',
        'User-Name': items.state.email,
        'User-Secret': items.state.password
      }

      axios.put('https://api.chatengine.io/chats/', body, {
        headers
      })
      .catch(function (err) {
        console.log(err);
      })
    }

  }, [newChat, items.state])

  if (!items.state) return <Redirect to='/'/>

  return (
    <ChatEngine
      height="100vh"
      projectID="9663adb6-d823-4a20-935f-b7381ba20105"
      userName={items.state && items.state.email}
      userSecret={items.state && items.state.password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>
    }
    />
  );
};

export default Chats;

