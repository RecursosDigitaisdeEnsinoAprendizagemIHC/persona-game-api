import { Request, Response } from "express";
import { updatePreferenceTypeService } from "../services/UpdatePreferenceTypeService";
import { makeResponse } from "./helpers/makeResponse";

export class UpdatePreferenceTypeController {
  async handle(request: Request, response: Response) {
    const { body, params } = request;

    const availableSteps = await updatePreferenceTypeService(Number(params.id), body.value);
    return makeResponse(response, availableSteps);
  }
}
