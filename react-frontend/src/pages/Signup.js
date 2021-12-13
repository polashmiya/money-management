import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
toast.configure();

//form validation
const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("InValid Email Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is Required"),
  // confirmPassword: Yup.string()
  //   .min(8, "Password is too short - should be 8 chars minimum.")
  //   .required("Password is Required"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = (values) => {
    axios
      .post("auth/signup", values)
      .then((response) => {
        setIsSignup(true);
        toast("Sing Up Successfull. Please Login");
      })
      .catch((error) => {
        setError("Given Information is Invalid!");
      });
  };
  if (isSignup) {
    return <Redirect to={"/login"} />;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <div className="form">
        <Form>
          <div className="login-title">Sign Up</div>
          <div className="error errors">{error}</div>
          <div className="form-control">
            <label htmlFor="name"> Full Name </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Fullname"
            />
            <ErrorMessage name="name">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="email"> E-mail </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your E-mail"
            />
            <ErrorMessage name="email">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="CreatePassword"> Create Password </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder=" Create New Password"
            />
            <ErrorMessage name="password">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="ConfirmPassword"> Confirm Password </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" Confirm Your Password"
            />
            <ErrorMessage name="confirmPassword">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="loginbtn">
            <button className="btn" type="submit">
              Sign Up
            </button>
            <span style={{ marginLeft: "10px", color: "blue" }}>
              Already SignUp?{" "}
              <Link to="/login" className="link">
                <span
                  style={{
                    marginLeft: "5px",
                    color: "red",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}>
                  Login
                </span>
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default SignUp;
