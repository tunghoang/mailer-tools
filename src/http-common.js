import axios from "axios";

export default axios.create({
  baseURL: "http://fit.uet.vnu.edu.vn",
  headers: {
    "Content-type": "application/json"
  }
});