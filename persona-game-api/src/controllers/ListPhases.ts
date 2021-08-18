import { Request, Response } from "express";
import { listPhasesService } from "../services/ListPhases";

export class ListPhasesController {
  async handle(request: Request, response: Response) {
    const phases = await listPhasesService();

    return response.json(phases);
  }
}
