import { AppDataSource } from '../config/db';
import { User } from '../entity/user.entity';


export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(email: string, password: string, username: string, birth_date: Date, gender: 'M' | 'F') {
        let user = await this.userRepository.findOneBy({ email });
        if (user) {
            throw new Error('해당 이메일은 이미 사용중입니다.');
        }

        user = await this.userRepository.findOneBy({ username });
        if (user) {
            throw new Error('해당 닉네임은 이미 사용중입니다.');
        }

        const newUser = this.userRepository.create({ email, password, username, birth_date, gender });
        return await this.userRepository.save(newUser);
    }
}