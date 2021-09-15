import { Request, Response } from "express";
import { checkStepAnswersService } from "../services/CheckStepAnswersService";

export class CheckStepAnswersController {
  async handle(request: Request, response: Response) {
    const { stepId, answers } = request.body;
    const { userId } = request;

    const stepResult = await checkStepAnswersService(
      parseInt(userId),
      stepId,
      answers
    );

    return response.json(stepResult);
  }
}
