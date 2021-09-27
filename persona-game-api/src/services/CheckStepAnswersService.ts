import { getCustomRepository } from "typeorm";
import moment from "moment";

import { getQuestionAnswer } from "../apis/games-qa/getQuestionAnswerService";
import { UserStepsLogRepository } from "../repositories/UserStepsLogRepository";
import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";
import { UserAnsweredQuestionsRepository } from "../repositories/UserAnsweredQuestionsRepository";
import { UserHasRewardRepository } from "../repositories/UserHasRewardRepository";
import { getStepRewardService } from "./GetStepRewardService";
import { QuestionComboRepository } from "../repositories/QuestionComboRepository";
import { StepComboRepository } from "../repositories/StepComboRepository";
import { getMedalRewardService } from "./GetMedalRewardService";

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
  const finishedTime = moment();
  const finishedInTime = await stepFinishedInTime(userId, finishedTime);
  if (!finishedInTime.success) return result;

  let answeredQuestions = await checkQuestionsAnswers(
    userId,
    answers,
    userAnswerdQuestionsRepository
  );

  let finishedStep;
  if (answeredQuestions.length >= MIN_CORRECT_ANSWERS) {
    for (let obj of answeredQuestions) {
      await userAnswerdQuestionsRepository.save(obj);
    }
    finishedStep = userFinishedStepRepository.create({
      stepId,
      userId,
      time_to_finish: finishedInTime.timeToFinish,
    });
    await userFinishedStepRepository.save(finishedStep);

    result.success = true;

    // check if a reward should be sent
    const userRewards = await getStepRewardService(stepId);
    result.rewards = userRewards;
    await giveUserRewards(userId, userRewards);
  }

  await updateStepCombo(userId, result.success);

  const medalRewards = await getMedalRewardService(userId, finishedStep);
  result.rewards = [...result.rewards, ...medalRewards];

  return result;
};

const stepFinishedInTime = async (userId, finishedTime) => {
  const userStepsLogRepository = getCustomRepository(UserStepsLogRepository);

  const stepLog = await userStepsLogRepository.findOne({
    userId,
    current_step: true,
  });
  const startTime = moment(stepLog.created_at);
  const secondsToComplete = Math.floor(
    finishedTime.diff(startTime, "seconds", true)
  );

  return {
    success: Math.floor(secondsToComplete / 60) <= MINUTES_TO_FINISH_STEP,
    timeToFinish: secondsToComplete,
  };
};

const checkQuestionsAnswers = async (
  userId,
  answers,
  userAnswerdQuestionsRepository
) => {
  const questionComboRepository = getCustomRepository(QuestionComboRepository);

  let userQuestionCombo = await questionComboRepository.findOne({ userId });
  if (!userQuestionCombo) {
    userQuestionCombo = questionComboRepository.create({ userId, combo: 0 });
  }

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

      userQuestionCombo.combo += 1;
    } else {
      userQuestionCombo.combo = 0;
    }
  }
  await questionComboRepository.save(userQuestionCombo);

  return answeredQuestions;
};

const giveUserRewards = async (userId, rewards) => {
  const userHasRewards = [];
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);

  for (let reward of rewards) {
    const userHasReward = userHasRewardRepository.create({
      userId,
      rewardId: reward.id,
    });
    userHasRewards.push(userHasReward);
  }

  userHasRewardRepository.save(userHasRewards);
};

const updateStepCombo = async (userId, success) => {
  const stepComboRepository = getCustomRepository(StepComboRepository);

  let userStepCombo = await stepComboRepository.findOne({ userId });
  if (!userStepCombo) {
    userStepCombo = stepComboRepository.create({ userId, combo: 0 });
  }

  if (success) {
    userStepCombo.combo += 1;
  } else {
    userStepCombo.combo = 0;
  }

  await stepComboRepository.save(userStepCombo);
};
