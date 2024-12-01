import { Repository, DataSource, EntityManager } from "typeorm";
import { REPOSITORY_TOKENS } from "../config/constants";
import { UserSkinRelation } from "../entities/user-skin-relation.entity";
import { SkinAttributeService } from "./skin-attribute.service";
import { injectable, inject } from "tsyringe";

@injectable()
export class UserSkinRelationService {
  constructor(
    @inject(REPOSITORY_TOKENS.UserSkinRelationRepository)
    private userSkinRelationRepository: Repository<UserSkinRelation>,
    private skinAttributeService: SkinAttributeService,
    private dataSource: DataSource
  ) {}

  async addUserSkinRelation(
    user_key: number,
    attr_key: number,
    transactionalEntityManager: EntityManager
  ): Promise<UserSkinRelation> {
    const relation = this.userSkinRelationRepository.create({
      user_key,
      attr_key,
    });
    return transactionalEntityManager.save(UserSkinRelation, relation);
  }

  async updateUserSkinRelation(
    user_key: number,
    attr_key: number[]
  ): Promise<void> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      {
        isolation: "READ COMMITTED";
      }
      await this.userSkinRelationRepository.delete({ user_key });
      for (const attr of attr_key) {
        await this.addUserSkinRelation(
          user_key,
          attr,
          transactionalEntityManager
        );
      }
    });
  }
}
