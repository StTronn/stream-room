import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => (
  <div className="h-screen grid content-center justify-center  w-full my-auto text-center">
    <ClipLoader color="#E50914" size={100} />
  </div>
);

export default Loading;
