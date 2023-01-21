import { EntityRepository, Repository } from "typeorm";
import { UserPreferences } from "../entities/UserPreferences";

@EntityRepository(UserPreferences)
export class UserPreferencesRepository extends Repository<UserPreferences> {
}
