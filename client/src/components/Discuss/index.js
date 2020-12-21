import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

//dummy data
const comments = [
  {
    text: "Despite its name the movie depicts reality in a beautiful way.",
    fullname: "Rishav Thakur",
    username: "Tron",
    replies: [
      {
        text: "yup true that",
        fullname: "Yash Soni",
        username: "naruto",
      },
    ],
  },
  {
    text: "watched it 2 times",
    fullname: "Yash Soni",
    username: "naruto",
    replies: [],
  },
];

const Discuss = () => {
  return (
    <div className="p-4 md:p-16">
      <div className=" h-12   flex justify-between items-center border-b border-nt-red-main my-4 pb-2">
        <div className="text-xl font-bold text-white">Discussion</div>
      </div>
      <AddComment />
      {comments.map((e) => (
        <Comment comment={e} />
      ))}
    </div>
  );
};

export default Discuss;
