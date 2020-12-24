import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import authRequest from "../../utils/authRequest";

const AddComment = ({ roomId, comments, setComments }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const createComment = async (e) => {
    try {
      setLoading(true);
      const newComment = await authRequest("/comment/create", { roomId, text });
      const newComments = [...comments, newComment];
      setComments(newComments);
      setLoading(false);
      setText("");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex py-4 px-2 rounded bg-nt-gray">
        <img
          alt="img"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
          className="rounded-full h-12 w-12 "
        />
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="bg-transparent mt-2 ml-2 md:ml-8 w-full text-white text-lg outline-none"
          placeholder="Add a Comment"
          rows="4"
        ></textarea>
      </div>

      <div className=" w-full grid justify-items-end my-2 inline-flex rounded shadow">
        <span
          onClick={createComment}
          className="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded text-nt-red-main bg-white hover:bg-indigo-50"
        >
          {loading ? <ClipLoader color="#ffffff" size={25} /> : "Comment"}
        </span>
      </div>
    </>
  );
};

export default AddComment;
