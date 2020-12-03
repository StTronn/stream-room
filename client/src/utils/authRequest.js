import axios from "axios";

const URL = "http://localhost:8000";

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
    return err;
  }
};

export default authRequest;
