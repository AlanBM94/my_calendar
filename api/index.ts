import axios from "axios";

const calendarAPI = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default calendarAPI;
