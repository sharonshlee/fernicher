import React from "react";
import "./App.scss";
import useApplicationData from "./components/useApplicationData";
import Map from "./components/Map";

const App = () => {
  const { state, dispatch } = useApplicationData();
  const userList = state.users.map((user) => (
    <li key={user.id}>
      {" "}
      {user.first_name} {user.last_name} {user.email}{" "}
    </li>
  ));
  return (
    <div className="App">
      <h1> Users </h1>
      <ul> {userList} </ul>
      <Map/>
    </div>
  );
};

export default App;
