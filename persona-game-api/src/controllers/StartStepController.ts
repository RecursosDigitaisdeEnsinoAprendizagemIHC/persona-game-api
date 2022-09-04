import { Request, Response } from "express";
import { getStepQuestionsService } from "../services/GetStepQuestionsService";
import { startStepService } from "../services/StartStepService";
import { makeResponse } from "./helpers/makeResponse";

export class StartStepController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const stepId = request.params.id;

    await startStepService(parseInt(userId), parseInt(stepId));
    const questions = await getStepQuestionsService(userId, stepId);
    return makeResponse(response, questions);
  }
}
