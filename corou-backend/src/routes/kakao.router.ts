import { Router } from 'express';
import { container } from 'tsyringe';
import { KakaoController } from '../controllers/kakao.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupKakaoRouter(): Router {
    const router = Router();
    const kakaoController = container.resolve(KakaoController)

    router.post('/login', (req, res) => kakaoController.kakaoLogin(req, res));

    return router;
}