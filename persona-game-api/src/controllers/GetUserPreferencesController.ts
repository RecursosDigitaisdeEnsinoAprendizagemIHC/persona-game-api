import { Request, Response } from "express";
import { getUserPreferencesService } from "../services/GetUserPreferencesService";
import { makeResponse } from "./helpers/makeResponse";

export class GetUserPreferencesController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const availableSteps = await getUserPreferencesService(Number(userId));
    return makeResponse(response, availableSteps);
  }
}
