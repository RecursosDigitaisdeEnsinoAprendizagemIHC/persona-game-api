import { getQuestionAnswer } from "../apis/games-qa/getQuestionAnswerService";
import { notFoundError } from "./helpers/erros";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";


export const checkQuestionAnswerService = async (
  questionId: number,
  answerSent: string
): Promise<ServiceResponseInterface> => {
  const questionAnswer = await getQuestionAnswer({ questionId });
  if (!questionAnswer) {
    return notFoundError('Resposta da questão')
  }
  const result = {
    reason: questionAnswer.answer.reason,
    correct: questionAnswer.answer.option === answerSent,
  };
  return success(result);
};
