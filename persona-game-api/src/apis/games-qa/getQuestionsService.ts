import { URLSearchParams } from "url";
import axios from "./baseApi";
// import axios from "axios";

interface IGetQuestion {
  subtheme?: string;
}

export const getQuestions = async (params: IGetQuestion) => {
  const urlParams = new URLSearchParams({
    ...params,
    theme: "persona",
  }).toString();
  try {
    const response = await axios.get(`/questions?${urlParams}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to communicate with GamesQA API!");
  }
};
