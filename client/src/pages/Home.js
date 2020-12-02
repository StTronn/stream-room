import React from "react";
import HomeBanner from "../components/HomeBanner";
import Flick from "../components/Flick";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        Your Rooms
      </p>
      <Flick />

      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        Friends Rooms
      </p>
      <Flick />
    </>
  );
};

export default Home;
