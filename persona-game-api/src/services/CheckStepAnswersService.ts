import { getCustomRepository } from "typeorm";
import moment from "moment";

import { getQuestionAnswer } from "../apis/games-qa/getQuestionAnswerService";
import { UserStepsLogRepository } from "../repositories/UserStepsLogRepository";
import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";
import { UserAnsweredQuestionsRepository } from "../repositories/UserAnsweredQuestionsRepository";

interface IAnswer {
  questionId: number;
  optionAnswer: string;
}

// if set difficulty, change this
const MIN_CORRECT_ANSWERS = 3;
const MINUTES_TO_FINISH_STEP = 5;

export const checkStepAnswersService = async (
  userId: number,
  stepId: number,
  answers: IAnswer[]
) => {
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );
  const userAnswerdQuestionsRepository = getCustomRepository(
    UserAnsweredQuestionsRepository
  );

  const result = {
    success: false,
    rewards: [],
  };

  // check time to finish
  const finishedInTime = await stepFinishedInTime(userId);
  if (!finishedInTime.success) return result;

  let answeredQuestions = await checkQuestionsAnswers(
    userId,
    answers,
    userAnswerdQuestionsRepository
  );

  if (answeredQuestions.length >= MIN_CORRECT_ANSWERS) {
    for (let obj of answeredQuestions) {
      await userAnswerdQuestionsRepository.save(obj);
    }
    const finishedStep = userFinishedStepRepository.create({
      stepId,
      userId,
      time_to_finish: finishedInTime.timeToFinish,
    });
    await userFinishedStepRepository.save(finishedStep);

    result.success = true;
    // check if a reward should be sent
  }

  return result;
};

const stepFinishedInTime = async (userId) => {
  const userStepsLogRepository = getCustomRepository(UserStepsLogRepository);

  const now = moment();
  const stepLog = await userStepsLogRepository.findOne({
    userId,
    current_step: true,
  });
  const startTime = moment(stepLog.created_at);
  const minutesToComplete = now.diff(startTime, "minutes", true);

  return {
    success: minutesToComplete <= MINUTES_TO_FINISH_STEP,
    timeToFinish: minutesToComplete,
  };
};

const checkQuestionsAnswers = async (
  userId,
  answers,
  userAnswerdQuestionsRepository
) => {
  const answeredQuestions = [];
  for (let answer of answers) {
    const { questionId, optionAnswer } = answer;
    let questionAnswer = await getQuestionAnswer({ questionId });
    if (!questionAnswer) {
      throw new Error("Question not found!");
    }

    // TODO check if question belong to step
    if (questionAnswer.answer.option === optionAnswer) {
      const answeredQuestion = userAnswerdQuestionsRepository.create({
        questionId,
        userId,
      });
      answeredQuestions.push(answeredQuestion);
    }
  }

  return answeredQuestions;
};
