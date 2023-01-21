import { EntityRepository, Repository } from "typeorm";
import { PreferenceType } from "../entities/PreferenceType";

@EntityRepository(PreferenceType)
export class PreferenceTypeRepository extends Repository<PreferenceType> {}
