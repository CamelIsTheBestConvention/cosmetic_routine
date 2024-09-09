import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    async createUser(req: Request, res: Response): Promise<void> {
        const { email, password, username, birth_date, gender } = req.body;

        if (!email || !password || !username || !birth_date || !gender) {
            console.log('missing fields:', email, password, username, birth_date, gender);
            res.status(400).json({ message: '모든 항목을 입력해주세요.' });
            return;
        }

        try {
            await this.userService.createUser(email, password, username, new Date(birth_date), gender);
            // await 
            // await userSkinRelationService.addUserSkinAttribute()
            res.status(201).json({ message: '회원가입 성공' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async checkUsername(req: Request, res: Response): Promise<void> {
        const { username } = req.body;
        const isExist = await this.userService.checkUsername(username);
        if (!isExist) {
            res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
        } else {
            res.status(400).json({ message: '이미 사용중인 닉네임입니다.' });
        }
    }
    async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: '모든 항목을 입력해주세요.' });
            return;
        }

        try {
            const user = await this.userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async getUserByKey(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        try {
            const user = await this.userService.getUserByKey(Number(user_key));
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
