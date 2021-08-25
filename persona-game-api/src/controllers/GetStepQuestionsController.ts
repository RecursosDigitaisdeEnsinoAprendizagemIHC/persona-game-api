import { Request, Response } from "express";
import { getStepQuestionsService } from "../services/GetStepQuestionsService";

export class GetStepQuestionsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const stepId = request.params.id;

    const questions = await getStepQuestionsService(userId, stepId);

    return response.json(questions);
  }
}
