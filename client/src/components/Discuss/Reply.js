import React from "react";

const Reply = ({ reply: { text, username, fullname } }) => {
  return (
    <div className="flex py-2 ">
      <img
        className="rounded-full h-8 w-8"
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
        alt="Logo"
      />
      <div className="ml-4">
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
          <ReplyText>{text}</ReplyText>

          <p className="text-sm mt-2 text-gray-400 text-light">
            {" "}
            <span className="mr-8"> Like </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReplyText = ({ children }) => (
  <p className="text-xs md:text-sm text-gray-300 mt-2 sm:max-w-xl sm:mx-auto md:mt-2 lg:mx-0">
    {children}
  </p>
);

export default Reply;
