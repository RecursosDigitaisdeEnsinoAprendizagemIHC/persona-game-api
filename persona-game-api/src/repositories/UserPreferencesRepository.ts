import { EntityRepository, Repository } from "typeorm";
import { UserPreferences } from "../entities/UserPreferences";

@EntityRepository(UserPreferences)
export class UserPreferencesRepository extends Repository<UserPreferences> {
  findPreferencesByUserId(userId) {
    return this.findOne({
      where: {
        userId,
      },
      relations: ["preferenceTypes"]
    });
  }
}
