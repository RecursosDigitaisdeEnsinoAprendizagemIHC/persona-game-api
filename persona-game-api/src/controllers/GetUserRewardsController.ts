import { Request, Response } from "express";
import { getUserRewardsService } from "../services/GetUserRewardsService";

export class GetUserRewardsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const userRewards = await getUserRewardsService(userId);

    return response.json(userRewards);
  }
}
