import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { UserService } from "../services/user.service";
import { KakaoService } from "../services/kakao.service";
import { verifyToken, generateToken } from "../utils/jwt.utils";

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

@injectable()
export class KakaoController {
    constructor(
        private userService: UserService,
        private kakaoService: KakaoService,
    ) { }


    async requestToken(req: Request, res: Response): Promise<void> {
        const { code } = req.body;

        try {
            const token = await this.kakaoService.requestToken(code);
            res.status(200).json(token);
        } catch (error) {
            res.status(400).json({ message: '카카오 토큰 발급 실패.' });
        }
    }

    async kakaoLogin(req: Request, res: Response): Promise<void> {
        const { code } = req.body; // 클라이언트로부터 받은 인가 코드

        try {
            // 1. 인가 코드로 토큰 요청
            const token = await this.kakaoService.requestToken({ code });

            // 2. 액세스 토큰으로 카카오 사용자 정보 요청
            const kakaoUser = await this.kakaoService.getUserInfo(token.access_token);

            // 카카오에서 받아온 이메일
            const email = kakaoUser.kakao_account.email;
            // const username = kakaoUser.kakao_account.profile.nickname;

            // 3. 우리 서비스에 사용자가 존재하는지 확인
            let user = await this.userService.getUserByEmail(email);

            // 4. 사용자가 존재하지 않으면 자동으로 회원가입 처리
            if (!user) {
                res.status(200).json({ email, password: '카카오계정' })
                return;
            }

            // 5. 로그인 처리: 세션을 생성하거나 JWT 발급
            // 예시: JWT 발급
            const jwtToken = generateToken(user);

            // 6. 프론트엔드에 JWT 전송 (또는 세션 생성)
            res.status(200).json({
                token: jwtToken,
                user: { user_key: user.user_key, username: user.username },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}