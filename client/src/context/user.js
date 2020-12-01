import React, { useReducer } from "react";

export const User = React.createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || false,
};

function reducer(state, action) {
  console.log("reducer");
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      localStorage.setItem("token", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <User.Provider value={value}>{props.children}</User.Provider>;
}
