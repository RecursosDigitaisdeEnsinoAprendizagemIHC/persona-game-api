import { getCustomRepository } from "typeorm";
import shuffle from "shuffle-array";

import { StepRepository } from "../repositories/StepRepository";
import { getQuestions } from "../apis/games-qa/getQuestionsService";
import { UserAnsweredQuestionsRepository } from "../repositories/UserAnsweredQuestionsRepository";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";
import { notFoundError } from "./helpers/erros";
import { success } from "./helpers/success";

export const getStepQuestionsService = async (userId, stepId): Promise<ServiceResponseInterface> => {
  const stepRepository = getCustomRepository(StepRepository);
  const userAnsweredQuestionsRepository = getCustomRepository(
    UserAnsweredQuestionsRepository
  );

  const step = await stepRepository.findStepWithPhase(stepId);
  if (!step) {
    return notFoundError('Passos');
  }

  let questions = await getQuestions({ subtheme: step.phase.topic });
  const answeredQuestions = await userAnsweredQuestionsRepository.findAllByUser(
    userId
  );
  const answeredQuestionsIds = answeredQuestions.map((obj) => obj.questionId);
  questions = questions.filter(
    (question) => !answeredQuestionsIds.includes(question.id)
  );
  return success(shuffle(questions).slice(0, 5));
};
