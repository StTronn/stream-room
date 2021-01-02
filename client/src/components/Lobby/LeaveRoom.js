import React, { useState } from "react";
import LeaveModal from "./LeaveModal";

const LeaveRoom = ({ id }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-nt-red-accent hover:bg-red-500 mx-auto mt-2 p-2 rounded-full shadow-md flex justify-center items-center"
      >
        <svg
          className="text-white toggle__lock w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <LeaveModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} id={id} />
    </>
  );
};

export default LeaveRoom;
