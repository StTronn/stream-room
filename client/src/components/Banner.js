import React, { useState, useEffect } from "react";
import authRequest from "../utils/authRequest";
import backgroundImage from "../back2.jpg";
import styled from "styled-components";
import SearchList from "./SearchList";
import DateComponent from "./Date/index";
import { FaUserFriends, FaClock } from "react-icons/fa";
import movieDbRequest from "../utils/movieDbRequest";
import moment from "moment";
import _ from "lodash";

const BannerContents = styled.div`
  padding-top: 100px;
  height: 100%;
  z-index: 5;
  width: 100%;

  background: linear-gradient(
    to right,
    rgba(26, 26, 26, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const getSearchResults = async (query) => {
  if (!query) return [];
  const results = await movieDbRequest("/search/multi", {
    query,
  });
  return _.take(results, 9);
};

const updateRoom = async (roomObj) => {
  const { movieObj, dateTime } = roomObj;
  //prevent empty updates due to network or other issues
  if (movieObj && dateTime) await authRequest("/room/update", roomObj);
};

const Banner = ({ obj }) => {
  const [title, setTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [movieObj, setMovieObj] = useState({});
  const [dateTime, setDateTime] = useState(false);
  const [roomObj, setRoomObj] = useState({});

  useEffect(() => {
    const changes = { movieObj, dateTime };
    setRoomObj({ ...obj, ...changes });
    updateRoom({ ...obj, ...changes });
  }, [movieObj, dateTime]);

  // search query
  useEffect(() => {
    const fetchData = async () => {
      const results = await getSearchResults(title);
      if (searching && title) {
        setSearchList(results);
        setMovieObj(results[0]);
      }
    };
    fetchData();
  }, [searching, title]);

  useEffect(() => {
    if (obj) {
      if (obj.movieObj) setMovieObj(obj.movieObj);
      if (obj.dateTime) setDateTime(new moment(obj.dateTime));
      if (obj.movieObj && (obj.movieObj.title || obj.movieObj.original_name))
        setTitle(obj.movieObj.title || obj.movieObj.original_name);
    }
  }, []);

  const handleBlur = () => {
    setSearching(false);
    if (movieObj && (movieObj.title || movieObj.original_name) && title)
      setTitle(movieObj.title || movieObj.original_name);
  };

  const setSearchingTrue = () => {
    setSearching(true);
  };

  const HandleTitleChange = (e) => {
    const value = e.target.value;
    if (!value || value === "") {
      setMovieObj({});
    }
    setTitle(value);
  };

  const imageUrl =
    movieObj && movieObj.backdrop_path
      ? baseUrl + movieObj.backdrop_path || movieObj.poster_path
      : backgroundImage;

  return (
    <Header imageUrl={imageUrl}>
      <BannerContents className="text-white px-4 md:px-16 ">
        <div onFocus={setSearchingTrue} onBlur={handleBlur}>
          <TitleInput
            placeholder="Search for a Movie"
            value={title}
            onChange={(e) => {
              HandleTitleChange(e);
            }}
          />

          {searching && <SearchList list={searchList} />}
        </div>

        {!searching && (
          <div>
            <Description>
              {movieObj ? movieObj.overview || prompt : prompt}
            </Description>
            <InfoCointaiers>
              <FaUserFriends className="inline mr-2" />
              {obj ? obj.users.length : 0} Members
              <br />
              <FaClock className="inline mr-2 text-white" />
              <DateComponent dateTime={dateTime} setDateTime={setDateTime} />
            </InfoCointaiers>
          </div>
        )}
      </BannerContents>
    </Header>
  );
};

const Header = ({ children, imageUrl }) => (
  <header
    className="object-contain bg-white white"
    style={{
      height: "70vh",
      color: "black",
      backgroundSize: "cover",
      backgroundImage: `url(
        ${imageUrl}
        )`,
      backgroundPosition: "center center",
    }}
  >
    {children}
  </header>
);

const TitleInput = (props) => (
  <input
    className="text-4xl bg-transparent tracking-tight font-extrabold text-white sm:text-5xl border-none focus:outline-none md:text-6xl max-w-full"
    {...props}
  />
);

const Description = ({ children }) => (
  <p
    style={{ minHeight: "150px" }}
    className="text-base text-gray-300 mt-5 sm:mx-auto  lg:mx-0"
  >
    {children}
  </p>
);

const InfoCointaiers = ({ children }) => (
  <div className=" text-white text-sm text-semibold mt-5 sm:mx-auto md:mt-5 lg:mx-0">
    {children}
  </div>
);

const prompt =
  "Select a movie to watch wait set the time and mood. Invite friends and stream together";
const baseUrl = "https://image.tmdb.org/t/p/original";
export default Banner;
