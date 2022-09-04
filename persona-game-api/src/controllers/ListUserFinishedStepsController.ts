import { Request, Response } from "express";
import { userFinishedStepService } from "../services/ListUserFinishedStepsService";
import { makeResponse } from "./helpers/makeResponse";

export class ListUserFinishedStepsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const availableSteps = await userFinishedStepService(userId);
    return makeResponse(response, availableSteps);
  }
}
