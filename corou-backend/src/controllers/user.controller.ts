import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        const { email, password, username, birth_date, gender } = req.body;

        if (!email || !password || !username || !birth_date || !gender) {
            res.status(400).json({ message: '모든 항목을 입력해주세요.' });
            return;
        }

        try {
            await userService.createUser(email, password, username, new Date(birth_date), gender);
            res.status(201).json({ message: '회원가입 성공' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: '모든 항목을 입력해주세요.' });
            return;
        }

        try {
            const user = await userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
