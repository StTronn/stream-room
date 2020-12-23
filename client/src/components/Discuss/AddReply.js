import React, { useState } from "react";
import authRequest from "../../utils/authRequest";

const AddReply = ({ setShowAddReply, commentId }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const AddReply = async () => {
    // commentId, user, text
    try {
      setLoading(true);
      await authRequest("/comment/createReply", { commentId, text: reply });
      setLoading(false);
      setReply("");
      setShowAddReply(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <span className="mt-2 flex items-center border-b border-nt-red-main py-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="appearance-none bg-transparent border-none w-80 text-white mr-3 py-1  leading-tight focus:outline-none"
          type="text"
          placeholder="Add a Reply"
          aria-label="Full name"
        />
      </span>

      <div className=" w-full grid justify-items-end my-2 inline-flex rounded shadow">
        <div>
          <span
            onClick={() => setShowAddReply(false)}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-semibold rounded-xs text-white  "
          >
            Cancel
          </span>
          <span
            onClick={() => {
              AddReply();
            }}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-semibold rounded text-white bg-nt-gray hover:bg-nt-gray"
          >
            Reply
          </span>
        </div>
      </div>
    </>
  );
};

export default AddReply;
