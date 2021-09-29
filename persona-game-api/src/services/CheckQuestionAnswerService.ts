import { getQuestionAnswer } from "../apis/games-qa/getQuestionAnswerService";

export const checkQuestionAnswerService = async (
  questionId: number,
  answerSent: string
) => {
  const questionAnswer = await getQuestionAnswer({ questionId });
  if (!questionAnswer) {
    throw new Error("Question not found!");
  }

  const result = {
    reason: questionAnswer.answer.reason,
    correct: questionAnswer.answer.option === answerSent,
  };

  return result;
};
