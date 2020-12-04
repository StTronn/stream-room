import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { URL } from "../utils/Routes";
import { User } from "../context/user";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "required";
  }

  if (!values.password) {
    errors.password = "required";
  }
  return errors;
};

const SignIn = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { user, dispatch } = useContext(User);
  const HandleSignUp = async (values) => {
    const endpoint = "/auth/login";
    const target = URL + endpoint;
    try {
      setLoading(true);
      const res = await axios.post(target, values);
      const user = res.data.user;
      dispatch({ type: "SET_USER", payload: user });
      history.push("/");
      console.log(res.data);
    } catch (err) {
      console.log("error", err.response.data.message);
      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
            <p className="text-center text-3xl font-bold text-white">Sign In</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <FieldName>
                  {" "}
                  username or email{" "}
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

              <button
                type="submit"
                defaultValue="Sign Up"
                className="bg-nt-red-main text-white font-bold text-lg  p-2 mt-8"
              >
                {loading ? <ClipLoader color="#ffffff" size={25} /> : "Sign In"}
              </button>
              <div className="text-center">
                {errorMessage ? (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : null}
              </div>
            </form>
            <div className="text-center pt-12 pb-0 text-white">
              <p>
                Don't have an account{" "}
                <Link
                  to="/signup"
                  className="underline font-semibold text-white"
                >
                  Sign Up here.
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

export default SignIn;
