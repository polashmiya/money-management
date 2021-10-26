import React, { createContext } from "react";
import { useState } from "react/cjs/react.development";
export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [state, setState] = useState(true);
  return (
    <AuthContext.Provider value={{ auth: state }}>
      {props.children}
    </AuthContext.Provider>
  );
};
