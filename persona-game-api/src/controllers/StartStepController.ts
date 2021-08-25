import { Request, Response } from "express";
import { getStepQuestionsService } from "../services/GetStepQuestionsService";
import { startStepService } from "../services/StartStepService";

export class StartStepController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const stepId = request.params.id;

    await startStepService(userId, stepId);
    const questions = await getStepQuestionsService(userId, stepId);

    return response.json(questions);
  }
}
