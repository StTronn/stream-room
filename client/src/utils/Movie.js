import backgroundImage from "../back2.jpg";
const baseUrl = "https://image.tmdb.org/t/p/original";

export const getPoster = (movieObj) => {
  const imageUrl =
    movieObj && movieObj.backdrop_path
      ? baseUrl + movieObj.backdrop_path || movieObj.poster_path
      : backgroundImage;
  return imageUrl;
};
