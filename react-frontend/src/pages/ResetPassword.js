import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
toast.configure();
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { setData } = useContext(AuthContext);
  const initialValue = {
    email: "",
    password: "",
  };
  const validSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is Required"),
    password: Yup.string()
      .required("Password is Needed")
      .min(8, "Your Password is too Short, Password should be greater than 8"),
  });

  const onSubmit = (values) => {
    axios
      .post("auth/signin", values)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        const data = jwtDecode(response.data.data.token);
        axios
          .get(`users/${data.id}`)
          .then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLogin(true);
        toast("Login Successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLogin) {
    return <Redirect to={"/"} />;
  }
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validSchema}>
      <div className="form">
        <Form>
          <div className="form-control">
            <label htmlFor="email"> Email </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your email"
            />
            <ErrorMessage name="email">
              {(errmsg) => <div className="errors"> {errmsg} </div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="password"> Password </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
            <ErrorMessage name="password">
              {(errmsg) => <div className="errors"> {errmsg} </div>}
            </ErrorMessage>
          </div>
          <button type="submit" className="btn">
            Log In
          </button>
          <span style={{ marginLeft: "10px", color: "red" }}>
            Not Any Account?
            <Link to="/signup" className="link">
              <span
                style={{
                  marginLeft: "5px",
                  color: "blue",
                  fontSize: "18px",
                  cursor: "pointer",
                }}>
                SignUp
              </span>
            </Link>
          </span>
          <p>
            <Link to="/forgotpassword" className="link">
              Forgot Password?
            </Link>
          </p>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
