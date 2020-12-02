import React, { useState, useEffect } from "react";
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

const Banner = () => {
  //state
  const [title, setTitle] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [dateTime, setDateTime] = useState(moment());
  const [roomObj, setRoomObj] = useState({});

  useEffect(() => {
    const changes = { currentMovie, dateTime };
    setRoomObj({ ...roomObj, ...changes });
  }, [currentMovie, dateTime]);

  // search query
  useEffect(() => {
    const fetchData = async () => {
      const results = await getSearchResults(title);
      setSearchList(results);
      setCurrentMovie(results[0]);
    };
    fetchData();
  }, [searching, title]);

  const handleBlur = () => {
    setSearching(false);
    if (currentMovie && currentMovie.title && title)
      setTitle(currentMovie.title);
  };
  const setSearchingTrue = () => {
    setSearching(true);
  };

  const HandleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const imageUrl = currentMovie
    ? baseUrl + currentMovie.backdrop_path || currentMovie.poster_path
    : backgroundImage;

  return (
    <Header imageUrl={imageUrl}>
      <BannerContents className="text-white md:px-16 sm:px-4">
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
              {currentMovie ? currentMovie.overview : prompt}
            </Description>
            <InfoCointaiers>
              <FaUserFriends className="inline mr-2" /> 5 Members
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
    className="text-4xl bg-transparent tracking-tight font-extrabold text-white sm:text-5xl border-none focus:outline-none md:text-6xl"
    {...props}
  />
);

const Description = ({ children }) => (
  <p
    style={{ minHeight: "150px" }}
    className="text-base text-gray-300 sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0"
  >
    {children}
  </p>
);

const InfoCointaiers = ({ children }) => (
  <p className=" text-white text-sm text-semibold sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
    {children}
  </p>
);

const prompt =
  "Select a movie to watch wait set the time and mood. Invite friends and stream together";
const baseUrl = "https://image.tmdb.org/t/p/original";
export default Banner;
