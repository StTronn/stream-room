import axios from "axios";
import { URL } from "../utils/Routes";

const LoginUrl = process.env.REACT_APP_CLIENT_URL + "/signin";

const authRequest = async (endpoint, data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) window.location.replace(LoginUrl);
    const { token } = user;
    if (!token) window.location.replace(LoginUrl);
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      const res = await axios.post(URL + endpoint, data, { headers });
      return res.data;
    } else {
      const res = await axios(URL + endpoint, { headers });
      return res.data;
    }
  } catch (err) {
    console.log(err);
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    )
      window.location.replace("/signin");
    throw err;
  }
};

export default authRequest;
