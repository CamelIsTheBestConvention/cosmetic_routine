import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { UserSkinRelationService } from '../services/user-skin-relation.service';
import { generateToken } from '../utils/jwt.utils';

@injectable()
export class UserController {
    constructor(
        private userService: UserService,
        private addressService: AddressService,
        // private userSkinRelationService: UserSkinRelationService
    ) { }

    async createUser(req: Request, res: Response): Promise<void> {
        const { email, password, username, birth_date, gender, attributes } = req.body;

        if (!email || !password || !username || !birth_date || !gender) {
            console.log('missing fields:', email, password, username, birth_date, gender);
            res.status(400).json({ message: '모든 항목을 입력해주세요.' });
            return;
        }

        if (attributes.length === 0) {
            res.status(400).json({ message: '피부타입을 선택해주세요.' });
            return;
        }

        try {
            const newUser = await this.userService.createUser(
                email,
                password,
                username,
                new Date(birth_date),
                gender,
                attributes
            );

            res.status(201).json({ message: '회원가입 성공', user_key: newUser.user_key });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async checkEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        const isExist = await this.userService.checkEmail(email);
        if (!isExist) {
            res.status(200).json({ message: '사용 가능한 이메일입니다.' });
        } else {
            res.status(400).json({ message: '이미 사용중인 이메일입니다.' });
        }
    }
    async checkUsername(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
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
            const token = generateToken({ user_key: user.user_key });

            res.status(200).json({ token, user: { user_key: user.user_key, username: user.username } });
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
    async getSelf(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: 'unimplemented' });
    }
    async addAddress(req: Request, res: Response): Promise<void> {
        console.log('in add address');
        console.log(req.params);
        console.log(req.body);
        const { user_key } = req.params;
        const { name, addr, addr_detail, zip, tel, request, is_default } = req.body;
        try {
            const address = await this.addressService.addAddress(Number(user_key), name, addr, addr_detail, zip, tel, request, is_default);
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAllAddress(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        try {
            const address = await this.addressService.getAllAddress(Number(user_key));
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async getUserAddress(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        try {
            const address = await this.addressService.getAddress(Number(user_key));
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateAddress(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        const { name, addr, addr_detail, zip, tel, request, is_default } = req.body;
        try {
            const address = await this.addressService.updateAddress(Number(user_key), name, addr, addr_detail, zip, tel, request, is_default);
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
