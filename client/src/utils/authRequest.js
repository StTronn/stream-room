import axios from "axios";

const URL = "http://localhost:8000";
const LoginUrl = "http://localhost:3000/signin";

const authRequest = async (endpoint, data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const { token } = user;
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
    if (err.response && err.response.status === 403)
      window.location.replace(LoginUrl);
    throw err;
  }
};

export default authRequest;
