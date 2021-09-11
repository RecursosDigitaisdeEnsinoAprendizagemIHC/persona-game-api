import axios from "./baseApi";

interface IGetQuestion {
  questionId?: number;
}

export const getQuestionAnswer = async ({ questionId }: IGetQuestion) => {
  try {
    const response = await axios.get(`/question/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to communicate with GamesQA API!");
  }
};
