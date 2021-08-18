import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListPhasesController } from "./controllers/ListPhases";
import { ListUserFinishedStepsController } from "./controllers/ListUserFinishedStepsController";

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const listPhasesController = new ListPhasesController();
const listUserFinishedStepsController = new ListUserFinishedStepsController();

router.post("/users", createUserController.handle);

// Authenticated routes
router.post("/login", ensureAuthenticated, authUserController.handle);
router.get("/phases", ensureAuthenticated, listPhasesController.handle);
router.get(
  "/finished_steps",
  ensureAuthenticated,
  listUserFinishedStepsController.handle
);
