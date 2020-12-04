import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { URL } from "../utils/Routes";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "required";
  } else if (values.password !== values.confirmPassword) {
    errors.password = "Passwords don't match";
  }

  if (!values.email) {
    errors.email = "required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();

  const HandleSignUp = async (values) => {
    const endpoint = "/auth/register";
    const target = URL + endpoint;
    try {
      setLoading(true);
      const res = await axios.post(target, values);
      console.log(res.data);
      history.push("/signin");
    } catch (err) {
      console.log("error", err.response.data.message);
      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      HandleSignUp(values);
    },
  });
  return (
    <>
      <div className="w-full flex flex-wrap">
        {/* Login Section */}
        <div className="w-full md:w-1/2 bg-nt-gray flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto  md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-bold text-white">Sign Up</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  Username{" "}
                  {formik.errors.username ? (
                    <ErrorMessage>{formik.errors.username}</ErrorMessage>
                  ) : null}
                </FieldName>

                <Input
                  placeholder="username"
                  id="username"
                  name="username"
                  type="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  Email{" "}
                  {formik.errors.email ? (
                    <ErrorMessage>{formik.errors.email}</ErrorMessage>
                  ) : null}
                </FieldName>
                <Input
                  placeholder="your@email.com"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>

              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  Full Name{" "}
                  {formik.errors.email ? (
                    <ErrorMessage>{formik.errors.email}</ErrorMessage>
                  ) : null}
                </FieldName>
                <Input
                  placeholder="your@email.com"
                  id="fullname"
                  name="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
              </div>

              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  Password{" "}
                  {formik.errors.password ? (
                    <ErrorMessage>{formik.errors.password}</ErrorMessage>
                  ) : null}
                </FieldName>
                <Input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>

              <div className="flex flex-col pt-4">
                <FieldName> Confirm Password </FieldName>
                <Input
                  placeholder="Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>
              <button
                type="submit"
                defaultValue="Sign Up"
                className="bg-nt-red-main text-white font-bold text-lg  p-2 mt-8"
              >
                {loading ? <ClipLoader color="#ffffff" size={25} /> : "Sign Up"}
              </button>
              <div className="text-center">
                {errorMessage ? (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : null}
              </div>
            </form>
            <div className="text-center pt-12 pb-0 text-white">
              <p>
                Already have an account{" "}
                <Link
                  to="/signin"
                  className="underline font-semibold text-white"
                >
                  Sign in here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="w-1/2  h-screen"
          style={{
            backgroundSize: "cover",
            backgroundImage: "url(https://source.unsplash.com/rICPk6Ob-aM)",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
    </>
  );
};

const ErrorMessage = ({ children }) => (
  <span className="text-sm text-nt-red-accent">{children} </span>
);

const FieldName = ({ children }) => (
  <label htmlFor="email" className="text-lg text-white">
    {children}
  </label>
);

const Input = (props) => (
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
    {...props}
  />
);

export default SignUp;
