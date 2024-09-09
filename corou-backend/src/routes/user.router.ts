import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';

export function setupUserRouter(): Router {
    const router = Router();
    const userController = container.resolve(UserController);

    router.post('/register', (req, res) => userController.createUser(req, res));
    router.post('/login', (req, res) => userController.loginUser(req, res));
    router.get('/check/:username', (req, res) => userController.checkUsername(req, res));
    router.get('/self', (req, res) => userController.getSelf(req, res));
    router.post('/:user_key/address', (req, res) => userController.addAddress(req, res));
    router.get('/:user_key', (req, res) => userController.getUserByKey(req, res));
    router.get('/', (req, res) => userController.getAllUsers(req, res));

    return router;
}