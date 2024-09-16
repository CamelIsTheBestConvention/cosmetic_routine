import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupUserRouter(): Router {
    const router = Router();
    const userController = container.resolve(UserController);

    router.get('/check/:email', (req, res) => userController.checkEmail(req, res));
    router.get('/check/:username', (req, res) => userController.checkUsername(req, res));
    router.get('/self', authMiddleware, (req, res) => userController.getSelf(req, res));
    router.get('/:user_key/address', authMiddleware, (req, res) => userController.getUserAddress(req, res));
    router.get('/:user_key', (req, res) => userController.getUserByKey(req, res));
    router.get('/', (req, res) => userController.getAllUsers(req, res));
    router.post('/register', (req, res) => userController.createUser(req, res));
    router.post('/login', (req, res) => userController.loginUser(req, res));
    router.post('/:user_key/address', authMiddleware, (req, res) => userController.addAddress(req, res));
    router.put('/:user_key/address', authMiddleware, (req, res) => userController.updateAddress(req, res));

    return router;
}

