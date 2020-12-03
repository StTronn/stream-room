import React from "react";
import User from "./User";

const Lobby = ({ obj }) => {
  console.log({ obj });
  return (
    <div className=" min-h-screen flex-1  p-4 mt-16 flex justify-center ">
      <div className=" w-full  md:max-w-4xl rounded shadow">
        <div className=" h-12   flex justify-between items-center border-b border-nt-red-main m-4 pb-2">
          <div>
            <div className="text-xl px-2 font-bold text-white">Lobby</div>
          </div>
          <div className="px-2">
            <div className="flex items-center justify-center w-full  shadow-md rounded-full">
              <label
                htmlfor="toogleA"
                className="flex items-center cursor-pointer"
              >
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
                        strokelinecap="round"
                        strokelinejoin="round"
                        strokewidth="{2}"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="px-6">
          {obj.users.map((e) => (
            <User user={e} />
          ))}
          <div className="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded  shadow-inner">
            <div className="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer">
              <div>
                <svg
                  className="text-gray-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokelinecap="round"
                    strokelinejoin="round"
                    strokewidth="{2}"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="ml-1 text-gray-500 font-medium">
                {" "}
                Invite a friend
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 ">
          <button className="p-4 bg-nt-red-main hover:bg-red-800 w-full rounded shadow text-xl font-medium uppercase text-white">
            <a href="https://www.tele.pe/netflix/7e80e64165fcea67?s=s140">
              Start Streaming
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
