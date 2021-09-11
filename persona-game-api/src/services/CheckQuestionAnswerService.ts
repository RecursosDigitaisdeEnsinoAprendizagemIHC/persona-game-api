import { getCustomRepository } from "typeorm";
import shuffle from "shuffle-array";

import { getQuestionAnswer } from "../apis/games-qa/getQuestionAnswerService";

export const checkQuestionAnswerService = async (
  questionId: number,
  answerSent: string
) => {
  let questionAnswer = await getQuestionAnswer({ questionId });
  if (!questionAnswer) {
    throw new Error("Question not found!");
  }

  const result = {
    reason: questionAnswer.answer.reason,
    correct: questionAnswer.answer.option === answerSent,
  };

  return result;
};
