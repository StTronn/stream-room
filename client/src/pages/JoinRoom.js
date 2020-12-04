import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Loading from "./Loading";
import NotFound from "./NotFound";
import authRequest from "../utils/authRequest";
import { useLocation, useHistory } from "react-router-dom";

const JoinRoom = () => {
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState(false);
  const { id } = queryString.parse(location.search);
  useEffect(() => {
    const join = async () => {
      try {
        console.log("joining");
        const data = await authRequest(`/room/join?id=${id}`);
        console.log({ data });
        history.push(`/room?id=${id}`);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    join();
  }, []);
  if (error) return <NotFound />;
  return <Loading />;
};

export default JoinRoom;
