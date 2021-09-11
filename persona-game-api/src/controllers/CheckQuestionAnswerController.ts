import { Request, Response } from "express";
import { checkQuestionAnswerService } from "../services/CheckQuestionAnswerService";

export class CheckQuestionAnswerController {
  async handle(request: Request, response: Response) {
    const questionId = parseInt(request.params.id);
    const answerSent = (request.query.answer as string) || "";

    const questionAnswer = await checkQuestionAnswerService(
      questionId,
      answerSent
    );

    return response.json(questionAnswer);
  }
}
