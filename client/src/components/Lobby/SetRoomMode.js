import React from "react";

const SetRoomMode = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full  shadow-md rounded-full">
        <label htmlFor="toogleA" className="flex items-center cursor-pointer">
          <div className="flex items-center">
            <input id="toogleA" type="checkbox" className="hidden" />
            <div className="toggle__line w-20 h-10 bg-white rounded-full shadow-inner"></div>
            <div className="toggle__dot bg-nt-red-main absolute w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
              <svg
                className="text-white w-6 h-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SetRoomMode;
