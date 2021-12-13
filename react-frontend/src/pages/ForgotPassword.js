import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const initialValues = {
  email: "",
};

const onSubmit = (values) => {
  alert("Your Form is Submitted");
  console.log({ values });
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("InValid Email Address")
    .required("Email is Required"),
});
const ForgotPassword = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <div className="form">
        <Form>
          <div className="login-title">Forgot Password</div>
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
          <button className="btn">Submit</button>
        </Form>
      </div>
    </Formik>
  );
};

export default ForgotPassword;
