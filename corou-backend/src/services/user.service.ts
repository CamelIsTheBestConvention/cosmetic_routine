import { Repository, DataSource } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { User } from '../entities/user.entity';
import { injectable, inject } from 'tsyringe';
import { UserSkinRelationService } from './user-skin-relation.service';

@injectable()
export class UserService {

    constructor(
        @inject(REPOSITORY_TOKENS.UserRepository) private userRepository: Repository<User>,
        private userSkinRelationService: UserSkinRelationService,
        private dataSource: DataSource
    ) { }

    // 사용자 생성
    async createUser(email: string, password: string, username: string, birth_date: Date, gender: 'M' | 'F', attributes: number[]): Promise<User> {
        return this.dataSource.transaction(async transactionalEntityManager => {
            const newUser = await transactionalEntityManager.save(User, {
                email,
                password,
                username,
                birth_date,
                gender
            });

            for (const attr_key of attributes) {
                await this.userSkinRelationService.addUserSkinRelation(
                    newUser.user_key,
                    attr_key,
                    transactionalEntityManager
                );
            }

            return newUser;
        });
    }
    // async createUser(email: string, password: string, username: string, birth_date: Date, gender: 'M' | 'F'): Promise<User> {
    //     let user = await this.userRepository.findOneBy({ email });
    //     if (user) {
    //         throw new Error('해당 이메일은 이미 사용중입니다.');
    //     }

    //     user = await this.userRepository.findOneBy({ username });
    //     if (user) {
    //         throw new Error('해당 닉네임은 이미 사용중입니다.');
    //     }

    //     const newUser = this.userRepository.create({
    //         email,
    //         password,
    //         username,
    //         birth_date,
    //         gender
    //     });
    //     return await this.userRepository.save(newUser);
    // }
    // 닉네임 중복 확인
    async checkUsername(username: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            return true;
        }
        return false;
    }
    // 사용자 로그인
    async loginUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('해당 이메일로 가입된 계정이 없습니다.');
        }

        if (user.password !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user;
    }
    // 모든 사용자 정보 조회
    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        if (!users) {
            throw new Error('유저 정보를 불러오는데 실패했습니다.');
        }
        return users;
    }
    // 사용자 정보 조회
    async getUserByKey(user_key: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ user_key });
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        user.password = '';
        return user;
    }
}

// const userRepository = AppDataSource.getRepository(User);
// const userService = new UserService(userRepository);