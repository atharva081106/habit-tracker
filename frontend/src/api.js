import axios from "axios";

const API = axios.create({
  baseURL: "https://habit-tracker-backend-jgib.onrender.com",
});

export default API;
