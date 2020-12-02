import axios from "axios";

const movieDbRequest = async (endpoint, params = {}) => {
  let url = process.env.REACT_APP_MOVIEDB_URL + endpoint;
  params.api_key = process.env.REACT_APP_MOVIEDB_KEY;
  const queryString = new URLSearchParams(params).toString();
  url += "?" + queryString;
  try {
    const res = await axios(url);
    return res.data.results;
  } catch (err) {
    return [];
  }
};

export default movieDbRequest;
