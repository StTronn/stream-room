import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import authRequest from "../../utils/authRequest";
import Comment from "./Comment";
import AddComment from "./AddComment";

//dummy data

const Discuss = ({ roomId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const comments = await authRequest(`/comment/get?roomId=${roomId}`);
        setComments(comments);
        setLoading(false);
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-4 md:p-16">
      <div className=" h-12   flex justify-between items-center border-b border-nt-red-main my-4 pb-2">
        <div className="text-xl font-bold text-white">Discussion</div>
      </div>
      <AddComment
        roomId={roomId}
        comments={comments}
        setComments={setComments}
      />
      {loading && <ClipLoader color="#ffffff" size={100} />}

      {comments.map((e, i) => (
        <Comment comment={e} key={e._id} />
      ))}
    </div>
  );
};

export default Discuss;
