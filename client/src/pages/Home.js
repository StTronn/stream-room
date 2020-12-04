import React, { useEffect, useState } from "react";
import authRequest from "../utils/authRequest";
import Loading from "../pages/Loading";
import HomeBanner from "../components/HomeBanner";
import Flick from "../components/Flick";

const Home = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rooms = await authRequest(`/room/userRooms`);
        console.log({ rooms });
        setMyRooms(rooms);
        setLoading(false);
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <HomeBanner modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        Your Rooms
      </p>
      {!modalIsOpen && <Flick list={myRooms} />}

      <p className="text-white pt-8 pb-4 text-base font-semibold px-8">
        Friends Rooms
      </p>
      <Flick />
    </>
  );
};

export default Home;
