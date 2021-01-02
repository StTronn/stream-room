import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import { User } from "../context/user";
import authRequest from "../utils/authRequest";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Lobby from "../components/Lobby/index";
import Discuss from "../components/Discuss/index";
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

  const user = JSON.parse(localStorage.getItem("user"));
  if (notFound) return <NotFound />;
  if (loading) return <Loading />;
  if (!roomObj) return <Loading />;
  const isAdmin = user.username === roomObj.users[0].username;
  const belongsToRoom =
    isAdmin || roomObj.users.some((e) => e.username === user.username);
  return (
    <>
      <Banner obj={roomObj} />
      <Lobby obj={roomObj} isAdmin={isAdmin} belongsToRoom={belongsToRoom} />
      <Discuss roomId={roomObj.id} />
    </>
  );
};

export default Room;
