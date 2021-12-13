import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
toast.configure();
const ChangePassword = () => {
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const { setData } = useContext(AuthContext);
  const initialValue = {
    email: "",
    password: "",
    newPassword: "",
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
      .put("auth/changePassword", values)
      .then((response) => {
        setIsChanged(true);
        setData(null);
        toast("Password Update Success");
      })
      .catch((error) => {
        setError("Email Or Password Is Wrong! ");
      });
  };
  if (isChanged) {
    return <Redirect to={"/login"} />;
  }
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validSchema}>
      <div className="form">
        <Form>
          <div className="login-title">Change Password</div>
          <div className="errors error">{error}</div>
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
            <label htmlFor="password"> Old Password </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Old Password"
            />
            <ErrorMessage name="password">
              {(errmsg) => <div className="errors"> {errmsg} </div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="password">New Password </label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter Your New Password"
            />
            <ErrorMessage name="password">
              {(errmsg) => <div className="errors"> {errmsg} </div>}
            </ErrorMessage>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default ChangePassword;
