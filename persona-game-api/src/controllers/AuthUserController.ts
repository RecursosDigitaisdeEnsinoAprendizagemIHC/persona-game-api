import { Request, Response } from "express";

import { authUserService } from "../services/AuthUserService";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    await authUserService(parseInt(userId));

    return response.json({ success: true });
  }
}