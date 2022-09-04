import { Request, Response } from "express";
import { getRewardsService } from "../services/GetRewardsService";
import { makeResponse } from "./helpers/makeResponse";

export class ListRewardsController {
  async handle(request: Request, response: Response) {
    const rewards = await getRewardsService();
    return makeResponse(response, rewards)
  }
}
