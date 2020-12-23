import React, { useState } from "react";
import moment from "moment";
import Reply from "./Reply";
import AddReply from "./AddReply";

const Comment = ({ comment: { _id, text, username, fullname, replies } }) => {
  const [showAddReply, setShowAddReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="px-2">
      <div className="flex pt-4 ">
        <img
          className="rounded-full h-12 w-12"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
          alt="Logo"
        />
        <div className="ml-2 md:ml-8 w-full">
          <div>
            <div className="text-sm font-semibold text-white ">
              {fullname}

              <span className="ml-2 mt-1 text-xs font-light text-gray-400">
                Dec 22, 2020
                {}{" "}
              </span>
            </div>
          </div>
          <div>
            <CommentText>{text}</CommentText>

            <p className="text-sm mt-2 text-gray-400 text-light">
              {" "}
              <span className="mr-8 cursor-pointer"> Like </span>{" "}
              <span
                className="cursor-pointer"
                onClick={() => {
                  setShowAddReply(true);
                }}
              >
                Reply
              </span>
            </p>
            {showAddReply && (
              <AddReply commentId={_id} setShowAddReply={setShowAddReply} />
            )}
          </div>
        </div>
      </div>
      <div className="px-14 md:px-20">
        {showReply && replies.map((e, i) => <Reply reply={e} key={i} />)}

        {replies && replies.length !== 0 && (
          <ShowReply setShowReply={setShowReply} showReply={showReply}>
            {!showReply ? "Show Replies" : "Hide Replies"}{" "}
          </ShowReply>
        )}
      </div>
    </div>
  );
};

const CommentText = ({ children }) => (
  <p className="text-sm md:text-base text-white mt-1 sm:max-w-xl  md:mt-1 lg:mx-0">
    {children}
  </p>
);

const ShowReply = ({ setShowReply, showReply, children }) => (
  <p
    onClick={() => {
      setShowReply(!showReply);
    }}
    className="cursor-pointer text-xs font-semibold mx-0 text-nt-red-accent mt-1 w-auto"
  >
    {children}
  </p>
);

export default Comment;
