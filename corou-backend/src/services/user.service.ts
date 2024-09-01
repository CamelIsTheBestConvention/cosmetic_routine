import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/user.entity';


export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    // 사용자 생성
    async createUser(email: string, password: string, username: string, birth_date: Date, gender: 'M' | 'F'): Promise<User> {
        let user = await this.userRepository.findOneBy({ email });
        if (user) {
            throw new Error('해당 이메일은 이미 사용중입니다.');
        }

        user = await this.userRepository.findOneBy({ username });
        if (user) {
            throw new Error('해당 닉네임은 이미 사용중입니다.');
        }

        const newUser = this.userRepository.create({
            email,
            password,
            username,
            birth_date,
            gender
        });
        return await this.userRepository.save(newUser);
    }
    // 사용자 로그인
    async loginUser(email: string, password: string) {
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
    async getUser(user_key: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ user_key });
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        user.password = '';
        return user;
    }
}

