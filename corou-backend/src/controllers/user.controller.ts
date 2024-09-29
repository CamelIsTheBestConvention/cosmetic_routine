import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { verifyToken, generateToken } from "../utils/jwt.utils";
import { UserService } from "../services/user.service";
import { AddressService } from "../services/address.service";
import { UserSkinRelationService } from "../services/user-skin-relation.service";
import { ItemOrderService } from "../services/item-order.service";

@injectable()
export class UserController {
    constructor(
        private userService: UserService,
        private addressService: AddressService,
        private itemOrderService: ItemOrderService // private userSkinRelationService: UserSkinRelationService
    ) { }

    async createUser(req: Request, res: Response): Promise<void> {
        const { email, password, username, birth_date, gender, attributes } =
            req.body;

        if (!email || !password || !username || !birth_date || !gender) {
            res.status(400).json({ message: "모든 항목을 입력해주세요." });
            return;
        }

        if (attributes.length === 0) {
            res.status(400).json({ message: "피부타입을 선택해주세요." });
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

            res
                .status(201)
                .json({ message: "회원가입 성공", user_key: newUser.user_key });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async checkEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        const isExist = await this.userService.checkEmail(email);
        if (!isExist) {
            res.status(200).json({ message: "사용 가능한 이메일입니다." });
        } else {
            res.status(400).json({ message: "이미 사용중인 이메일입니다." });
        }
    }
    async checkUsername(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const isExist = await this.userService.checkUsername(username);
        if (!isExist) {
            res.status(200).json({ message: "사용 가능한 닉네임입니다." });
        } else {
            res.status(400).json({ message: "이미 사용중인 닉네임입니다." });
        }
    }
    async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "모든 항목을 입력해주세요." });
            return;
        }

        try {
            const user = await this.userService.loginUser(email, password);
            const token = generateToken({ user_key: user.user_key });

            res.status(200).json({
                token,
                user: { user_key: user.user_key, username: user.username },
            });
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
        res.status(200).json({ message: "unimplemented" });
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        const { attributes } = req.body;

        try {
            const user = await this.userService.updateUser(Number(user_key), attributes);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        const { user_key } = req.params;
        const { currentPassword, newPassword } = req.body;

        try {
            await this.userService.changePassword(Number(user_key), currentPassword, newPassword);
            res.status(200).json({ message: '패스워드가 성공적으로 변경되었습니다.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async addAddress(req: Request, res: Response): Promise<void> {
        console.log("in add address");
        console.log(req.params);
        console.log(req.body);
        const { user_key } = req.params;
        const { address_name, name, addr, addr_detail, zip, tel, request, is_default } = req.body;
        try {
            const address = await this.addressService.addAddress(
                Number(user_key),
                address_name,
                name,
                addr,
                addr_detail,
                zip,
                tel,
                request,
                is_default
            );
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
    async getOneAddress(req: Request, res: Response): Promise<void> {
        console.log("헤더", req.headers);
        const { user_key, addr_key } = req.params;
        try {
            const address = await this.addressService.getOneAddress(
                Number(user_key),
                Number(addr_key)
            );
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateAddress(req: Request, res: Response): Promise<void> {
        const { user_key, addr_key } = req.params;
        const { address_name, name, addr, addr_detail, zip, tel, request, is_default } = req.body;
        try {
            const address = await this.addressService.updateAddress(Number(user_key), Number(addr_key), address_name, name, addr, addr_detail, zip, tel, request, is_default);
            res.status(200).json(address);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteAddress(req: Request, res: Response): Promise<void> {
        const { addr_key } = req.params;
        try {
            await this.addressService.deleteAddress(Number(addr_key));
            res.status(200).json({ message: "배송지가 삭제되었습니다." });
        } catch (error: any) {
            res.status(400).json({ message: error });
        }
    }

    async createItemOrder(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const { addr_key, price_total } = req.body;
        const items = req.body.items;
        try {
            const order = await this.itemOrderService.createItemOrder(
                Number(user_key),
                Number(addr_key),
                price_total,
                items
            );
            res.status(200).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getItemOrderByUser(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        try {
            const order = await this.itemOrderService.getItemOrderByUser(
                Number(user_key)
            );
            res.status(200).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getItemOrderByKey(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const { order_key } = req.params;
        try {
            const order = await this.itemOrderService.getItemOrderByKey(
                Number(order_key),
                Number(user_key)
            );

            res.status(200).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
