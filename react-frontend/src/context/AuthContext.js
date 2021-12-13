import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    if (token) {
      const data = jwtDecode(token);
      authAxios
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
      value={{
        token: token || null,
        user: user,
        setData: setData,
        authAxios: authAxios,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
