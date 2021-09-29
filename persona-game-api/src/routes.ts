import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListPhasesController } from "./controllers/ListPhases";
import { ListUserFinishedStepsController } from "./controllers/ListUserFinishedStepsController";
import { StartStepController } from "./controllers/StartStepController";
import { CheckQuestionAnswerController } from "./controllers/CheckQuestionAnswerController";
import { CheckStepAnswersController } from "./controllers/CheckStepAnswersController";
import { ListRewardsController } from "./controllers/ListRewardsController";
import { GetUserRewardsController } from "./controllers/GetUserRewardsController";

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const listPhasesController = new ListPhasesController();
const listUserFinishedStepsController = new ListUserFinishedStepsController();
const listRewardsController = new ListRewardsController();
const startStepController = new StartStepController();
const checkQuestionAnswerController = new CheckQuestionAnswerController();
const checkStepAnswersController = new CheckStepAnswersController();
const getUserRewardsController = new GetUserRewardsController();

router.post("/users", createUserController.handle);

// Authenticated routes
router.post("/login", ensureAuthenticated, authUserController.handle);
router.get("/phases", ensureAuthenticated, listPhasesController.handle);
router.get(
  "/finished_steps",
  ensureAuthenticated,
  listUserFinishedStepsController.handle
);
router.get("/step/:id/start", ensureAuthenticated, startStepController.handle);
router.post(
  "/step/finish",
  ensureAuthenticated,
  checkStepAnswersController.handle
);
router.get(
  "/question/:id/check",
  ensureAuthenticated,
  checkQuestionAnswerController.handle
);
router.get("/rewards", ensureAuthenticated, listRewardsController.handle);
router.get("/my_rewards", ensureAuthenticated, getUserRewardsController.handle);
