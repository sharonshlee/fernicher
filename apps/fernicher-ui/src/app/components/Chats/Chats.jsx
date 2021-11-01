import React, { useState, useContext, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chats.css';
import ChatFeed from './ChatFeed';
import { LoggedInContext } from "../../providers/LoggedInContext";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { set } from 'lodash';


const Chats = (props) => {
  const items= useContext(LoggedInContext);
  const [newChat, setNewChat] = useState(props.location.state ? props.location.state : null);

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
      .catch(function (error) {
        console.log("ERROR IS", error);
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
// import React, { useState, useContext, useEffect } from 'react';
// import { ChatEngine } from 'react-chat-engine';
// import './Chats.css';
// import ChatFeed from './ChatFeed';
// import { LoggedInContext } from "../../providers/LoggedInContext";
// import {Redirect} from 'react-router-dom';
// import axios from 'axios';
// import { set } from 'lodash';


// const Chats = (props) => {
//   const items= useContext(LoggedInContext);
//   const [chatsState, setChatStart] = useState(props.location.state);
//   const [chatID, setChatID] = useState(null);
//   const [newChat, setNewChat] = useState(null);

//   console.log("STATE IS: ", chatsState)
//   console.log(chatsState);

//   useEffect(() => {
//     if (chatsState) {
//       const username = chatsState.email;
//       console.log("USERNAME IS:", username)
//       const body = {
//         "usernames": [username],
//         "title": [username],
//         "is_direct_chat": true
//       }

//       const headers = {
//         'Project-ID': '9663adb6-d823-4a20-935f-b7381ba20105',
//         'User-Name': items.state.email,
//         'User-Secret': items.state.password
//       }

//       axios.put('https://api.chatengine.io/chats/', JSON.stringify(body), {
//         headers
//       })
//       .then(res => {
//         console.log("RESPONSE FROM PUT IS THIS: ", res.data)
//         setChatID(res.data.id);
//         setNewChat(res.data)
//     })

//   }}, [chatsState, items.state])

//   if (!items.state) return <Redirect to='/'/>

//   return (
//     <ChatEngine
//       height="100vh"
//       projectID="9663adb6-d823-4a20-935f-b7381ba20105"
//       userName={items.state && items.state.email}
//       userSecret={items.state && items.state.password}
//       renderChatFeed={(chatAppProps) => {
//       let finalProps = {...chatAppProps};
//       console.log("CHAT APP PROPS ARE: ", chatAppProps)
//       if (chatID) {
//         console.log("CHAT ID IS THIS: ", chatID)
//         const newChats = {...chatAppProps.chats, [chatID]: newChat}
//         finalProps = {...chatAppProps, activeChat:chatID, chats: newChats}
//       }
//       console.log("FINAL PROPS ARE: ", finalProps)
//       return <ChatFeed {...finalProps}/>
//     }}
//     />
//   );
// };

// export default Chats;
