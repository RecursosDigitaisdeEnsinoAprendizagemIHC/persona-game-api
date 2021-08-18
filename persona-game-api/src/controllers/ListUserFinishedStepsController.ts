import { Request, Response } from "express";
import { userFinishedStepService } from "../services/ListUserFinishedStepsService";

export class ListUserFinishedStepsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const availableSteps = await userFinishedStepService(userId);

    return response.json(availableSteps);
  }
}
