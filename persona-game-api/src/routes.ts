import { Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

router.post("/users", createUserController.handle);
router.post("/login", ensureAuthenticated, authUserController.handle);
