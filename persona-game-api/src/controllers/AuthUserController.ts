import { Request, Response } from "express";

import { authUserService } from "../services/AuthUserService";
import { makeResponse } from "./helpers/makeResponse";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const serviceReponse = await authUserService(parseInt(userId));
    return  makeResponse(response, serviceReponse);
  }
}