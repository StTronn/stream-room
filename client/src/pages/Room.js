import React, { useState, useEffect } from "react";
import queryString from "query-string";
import authRequest from "../utils/authRequest";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Lobby from "../components/Lobby/index";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Room = () => {
  const [roomObj, setRoomObj] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { id } = queryString.parse(location.search);
        if (!id) setNotFound(true);
        //fetch room obj with id
        setLoading(true);
        const room = await authRequest(`/room/get?id=${id}`);
        setRoomObj(room);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setNotFound(true);
      }
    };
    fetchRoom();
  }, []);

  if (notFound) return <NotFound />;
  if (loading) return <Loading />;
  if (!roomObj) return <Loading />;
  return (
    <>
      <Banner obj={roomObj} />
      <Lobby obj={roomObj} />
    </>
  );
};

export default Room;
