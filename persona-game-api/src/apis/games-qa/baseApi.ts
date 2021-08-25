import axios from "axios";

export default axios.create({
  baseURL: process.env.GAMES_QA_ENDPOINT,
});
