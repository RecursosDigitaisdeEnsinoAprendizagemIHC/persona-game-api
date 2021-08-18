import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListPhasesController } from "./controllers/ListPhases";

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const listPhasesController = new ListPhasesController();

router.post("/users", createUserController.handle);

// Authenticated routes
router.post("/login", ensureAuthenticated, authUserController.handle);
router.get("/phases", ensureAuthenticated, listPhasesController.handle);
