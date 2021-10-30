import React, { useState, useContext, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chats.css';
import ChatFeed from './ChatFeed';
import { LoggedInContext } from "../../providers/LoggedInContext";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { set } from 'lodash';


const Chats = (props) => {
  const [state, setState] = useContext(LoggedInContext);
  const [chatStart, setChatStart] = useState(props.location.state);
  const [chatID, setChatID] = useState(null);
  const [newChat, setNewChat] = useState(null);




  useEffect(() => {
    if (chatStart) {
      const username = chatStart.email;
      const body = {
        "usernames": [username],
        "title": [username],
        "is_direct_chat": true
      }

      const headers = {
        'Project-ID': '9663adb6-d823-4a20-935f-b7381ba20105',
        'User-Name': state.email,
        'User-Secret': state.password
      }

      axios.put('https://api.chatengine.io/chats/', JSON.stringify(body), {
        headers
      })
      .then(res => {
        console.log("RESPONSE FROM PUT IS THIS: ", res.data)
        setChatID(res.data.id);
        setNewChat(res.data)
      })
    }

  }, [chatStart, state])

  if (!state) return <Redirect to='/'/>

  return (
    <ChatEngine
      height="100vh"
      projectID="9663adb6-d823-4a20-935f-b7381ba20105"
      userName={state.email}
      userSecret={state.password}
      renderChatFeed={(chatAppProps) => {
      let finalProps = {...chatAppProps};

      if (chatID) {
        console.log("CHAT ID IS THIS: ", chatID)
        const newChats = {...chatAppProps.chats, [chatID]: newChat}
        finalProps = {...chatAppProps, activeChat:chatID, chats: newChats}
      }
      console.log("FINAL PROPS ARE: ", finalProps)
      return <ChatFeed {...finalProps}/>
    }}
    />
  );
};

export default Chats;
