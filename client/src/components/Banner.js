import React, { useState, useEffect } from "react";
import backgroundImage from "../back2.jpg";
import styled from "styled-components";
import SearchList from "./SearchList";
import { FaUserFriends, FaClock } from "react-icons/fa";
import movieDbRequest from "../utils/movieDbRequest";
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
  return _.take(results, 6);
};

const Banner = () => {
  const [title, setTitle] = useState("La La Land");
  const [searching, setSearching] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
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
    <div className="relative bg-nt-red-main">
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
        <BannerContents className="text-white md:px-16 sm:px-4">
          <div onFocus={setSearchingTrue} onBlur={handleBlur}>
            <input
              placeholder="Search for a Movie"
              className="text-4xl bg-transparent tracking-tight font-extrabold text-white sm:text-5xl border-none focus:outline-none md:text-6xl"
              value={title}
              onChange={(e) => {
                HandleTitleChange(e);
              }}
            />
            {searching && <SearchList list={searchList} />}
          </div>
          {!searching && (
            <div>
              <p
                style={{ minHeight: "150px" }}
                className="text-sm text-gray-300 sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0"
              >
                {currentMovie
                  ? currentMovie.overview
                  : "Select a movie to watch wait set the time and moode. Invite friends and stream together"}
              </p>
              <p className=" text-white text-sm  sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                <FaUserFriends className="inline mr-2" /> 5 Members
              </p>

              <p className=" text-white text-sm    sm:max-w-xl sm:mx-auto  lg:mx-0">
                <FaClock className="inline mr-2" />{" "}
                <span className="text-gray-300"> Sun Nov 29 2020,</span> 9:30 PM
              </p>
            </div>
          )}
        </BannerContents>
      </header>
    </div>
  );
};

const baseUrl = "https://image.tmdb.org/t/p/original";
export default Banner;
