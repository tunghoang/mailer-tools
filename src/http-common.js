import axios from "axios";

export const http =  axios.create({
  baseURL: "http://112.137.129.214:35280/",
  headers: {
    "Content-type": "application/json"
  }
});

export const login = axios.create({
  baseURL: "http://112.137.129.214:35280",
  headers: {
    "Content-type": "application/json"
  }
})