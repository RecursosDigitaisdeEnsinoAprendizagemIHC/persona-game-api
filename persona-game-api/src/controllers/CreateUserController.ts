import { Request, Response } from "express";
import { createUserService } from "../services/CreateUserService";
import { makeResponse } from "./helpers/makeResponse";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const userToken = await createUserService();
    return makeResponse(response, userToken);
  }
}