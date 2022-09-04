import { Request, Response } from "express";
import { getUserRewardsService } from "../services/GetUserRewardsService";
import { makeResponse } from "./helpers/makeResponse";

export class GetUserRewardsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const userRewards = await getUserRewardsService(parseInt(userId));
    return makeResponse(response, userRewards);
  }
}
