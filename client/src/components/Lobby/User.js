import React from "react";

const User = ({ username, admin }) => {
  return (
    <div className="flex justify-between items-center text-white h-16 p-4 my-6 bg-nt-gray rounded border border-nt-gray shadow-md">
      <div className="flex items-center">
        <img
          className="rounded-full h-12 w-12"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
          alt="Logo"
        />
        <div className="ml-2">
          <div className="text-sm font-semibold text-white">{username}</div>
          <div className="text-sm font-light text-nt-red-main">
            {admin ? "admin" : ""}{" "}
          </div>
        </div>
      </div>
      <div>
        <button className="bg-nt-red-accent hover:bg-red-500 p-2 rounded-full shadow-md flex justify-center items-center">
          <svg
            className="text-white toggle__lock w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokelinecap="round"
              strokelinejoin="round"
              strokewidth="{2}"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default User;
