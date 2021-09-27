import { EntityRepository, Repository } from "typeorm";
import { QuestionCombo } from "../entities/QuestionCombo";

@EntityRepository(QuestionCombo)
export class QuestionComboRepository extends Repository<QuestionCombo> {}
