import { Request, Response } from "express";
import { listPhasesService } from "../services/ListPhases";
import { makeResponse } from "./helpers/makeResponse";

export class ListPhasesController {
  async handle(request: Request, response: Response) {
    const phases = await listPhasesService();
    return makeResponse(response, phases);
  }
}
