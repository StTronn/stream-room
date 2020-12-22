import React from "react";
import Reply from "./Reply";

const Comment = ({ comment: { text, username, fullname, replies } }) => {
  return (
    <div className="px-2">
      <div className="flex py-4 ">
        <img
          className="rounded-full h-12 w-12"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
          alt="Logo"
        />
        <div className="ml-2 md:ml-8">
          <div>
            <div className="text-sm font-semibold text-white ">
              {fullname}

              <span className="ml-2 text-sm font-light text-nt-red-accent">
                {username}{" "}
              </span>
            </div>
            <div className="mt-1 text-xs font-light text-gray-200">
              Dec 22, 2020
            </div>
          </div>
          <div>
            <CommentText>{text}</CommentText>

            <p className="text-sm text-gray-400 text-light">
              {" "}
              <span className="mr-8"> Like </span> <span>Reply</span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-20">
        {replies.map((e, i) => (
          <Reply reply={e} key={i} />
        ))}
      </div>
    </div>
  );
};

const CommentText = ({ children }) => (
  <p className="text-sm md:text-base text-gray-300 mt-4 sm:max-w-xl sm:mx-auto md:mt-4 lg:mx-0">
    {children}
  </p>
);

export default Comment;
