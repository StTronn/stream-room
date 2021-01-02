import React from "react";
import DeleteUser from "./DeleteUser";

const User = ({ user, admin, isAdmin }) => {
  const { username, fullname } = user;
  return (
    <div className="flex justify-between items-center text-white h-16 p-4 my-6 bg-nt-gray rounded border border-nt-gray shadow-md">
      <div className="flex items-center">
        <img
          className="rounded-full h-12 w-12"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
          alt="Logo"
        />
        <div className="ml-2">
          <div className="text-sm font-semibold text-white">{fullname}</div>
          <div className="text-sm font-light text-nt-red-accent">
            {username}{" "}
          </div>
        </div>
      </div>
      <div>{!admin && isAdmin && <DeleteUser />}</div>
    </div>
  );
};

export default User;
