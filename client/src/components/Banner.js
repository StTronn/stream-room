import React from "react";
import backgroundImage from "../back2.jpg";
import styled from "styled-components";
import { FaUserFriends, FaClock } from "react-icons/fa";

const BannerContents = styled.div`
  padding-top: 100px;
  padding-left: 60px;
  height: 100%;
  z-index: 10;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(27, 27, 27, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const BannerTitle = styled.h1`
  padding-top: 0.3rem;
`;

const BannerFadeBottom = styled.div`
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;

const Clip = styled.div`
  position: absolute;
  background: rgb(229, 9, 20);
  background: linear-gradient(
    0deg,
    rgba(229, 9, 20, 1) 0%,
    rgba(34, 31, 31, 0.035140008151698154) 100%
  );
  top: 0;
  clip-path: polygon(86% 0, 100% 0, 100% 100%, 63% 100%);
  right: 0;
  width: 100vw;
  height: 100%;
`;

const Banner = () => {
  return (
    <div className="relative">
      <header
        className="object-contain bg-white white"
        style={{
          height: "60vh",
          color: "black",
          backgroundSize: "cover",
          backgroundImage: `url(
        ${backgroundImage}
        )`,
          backgroundPosition: "center center",
        }}
      >
        <BannerContents className="text-white">
          <BannerTitle className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            La La Land
          </BannerTitle>
          <div>
            <p className="text-sm text-gray-400 sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              Sebastian (Ryan Gosling) and Mia (Emma Stone) are drawn together
              by their common desire to do what they love. But as success mounts
              they are faced with decisions that begin to fray the fragile
              fabric of their love affair, and the dreams they worked so hard to
              maintain in each other threaten to rip them apart.
            </p>
            <p className=" text-white text-sm  sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              <FaUserFriends className="inline mr-2" /> 5 Members
            </p>

            <p className=" text-white text-sm    sm:max-w-xl sm:mx-auto  lg:mx-0">
              <FaClock className="inline mr-2" />{" "}
              <span className="text-gray-400"> Sun Nov 29 2020,</span> 9:30 PM
            </p>
          </div>
        </BannerContents>
      </header>
    </div>
  );
};

export default Banner;
