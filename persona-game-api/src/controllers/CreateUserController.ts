import { Request, Response } from "express";
import { createUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const userToken = await createUserService();

    return response.json(userToken);
  }
}