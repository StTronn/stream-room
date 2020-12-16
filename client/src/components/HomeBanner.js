import React from "react";
import authRequest from "../utils/authRequest";
import Modal from "../components/HomeModal";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Clip = styled.div`
  position: absolute;
  background: rgb(229, 9, 20);
  background: linear-gradient(
    0deg,
    rgba(229, 9, 20, 1) 0%,
    rgba(34, 31, 31, 0.035140008151698154) 100%
  );
  top: 0;
  clip-path: polygon(63% 0, 100% 0%, 100% 100%, 36% 100%);
  right: 0;
  width: 100vw;
  height: 100%;
`;

const HomeBanner = ({ modalIsOpen, setIsOpen }) => {
  const openModal = () => {
    setIsOpen(true);
  };
  const history = useHistory();
  const createRoom = async () => {
    try {
      const data = await authRequest("/room/create");
      console.log(data);
      history.push(`/room?id=${data.id}`);
    } catch (err) {
      console.log(err.response.status);
      if (err.response && err.response.status === 403) history.push("/signin");
      console.log(err);
    }
  };
  return (
    <div className="relative w-full">
      <div className="bg-nt-gray">
        <div className="max-w-7xl  py-12 px-8 sm:px-4  ">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-white">
              The perfect companion for Binge Plans.
            </span>
            <span className="block text-nt-red-main">
              Start Streaming together
            </span>
          </h2>
          <div className="mt-20 lex ">
            <div className="inline-flex rounded shadow">
              <div
                href="/"
                onClick={() => openModal()}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded text-white bg-nt-red-main hover:bg-red-700"
              >
                Join Room
              </div>
            </div>
            <div className="ml-3 inline-flex rounded shadow">
              <a
                href="/#"
                onClick={createRoom}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded text-nt-red-main bg-white hover:bg-indigo-50"
              >
                Create Room
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Clip/>
      </div>
      <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default HomeBanner;
