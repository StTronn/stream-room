import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => (
  <div className="h-scree w-full text center">
    <ClipLoader color="#E50914" size={100} />
  </div>
);

export default Loading;
