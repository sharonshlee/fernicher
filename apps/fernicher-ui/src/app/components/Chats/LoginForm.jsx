import { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const authObject = {
      'Project-ID': '9663adb6-d823-4a20-935f-b7381ba20105',
      'User-Name': username,
      'User-Secret': password
  }

    axios.get('https://api.chatengine.io/chats', { headers: authObject })
    .then(() => {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      window.location.reload();
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required/>
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default LoginForm;
