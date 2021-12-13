import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  useEffect(() => {
    if (token) {
      const data = jwtDecode(token);
      axios
        .get(`users/${data.id}`)
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const setData = (data) => {
    setUser(data);
  };
  return (
    <AuthContext.Provider
      value={{ token: token || null, user: user, setData: setData }}>
      {props.children}
    </AuthContext.Provider>
  );
};
