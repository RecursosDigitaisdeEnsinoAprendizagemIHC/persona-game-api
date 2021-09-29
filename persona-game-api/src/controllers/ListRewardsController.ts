import { Request, Response } from "express";
import { getRewardsService } from "../services/GetRewardsService";

export class ListRewardsController {
  async handle(request: Request, response: Response) {
    const rewards = await getRewardsService();

    return response.json(rewards);
  }
}
