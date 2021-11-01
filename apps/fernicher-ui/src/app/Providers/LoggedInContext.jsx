import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoggedInContext = React.createContext();

const LoggedInProvider = (props) => {
  const [state, setState] = useState(null);

  return (
    <LoggedInContext.Provider value={{ state, setState }}>
      {props.children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
