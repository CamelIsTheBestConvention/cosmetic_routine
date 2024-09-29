import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export function setupUserRouter(): Router {
  const router = Router();
  const userController = container.resolve(UserController);

  // /api/user/
  router.get("/checkemail/:email", (req, res) => userController.checkEmail(req, res));
  router.get("/checkusername/:username", (req, res) => userController.checkUsername(req, res));
  router.get("/self", authMiddleware, (req, res) => userController.getSelf(req, res));
  router.get("/:user_key/address/:addr_key", authMiddleware, (req, res) => userController.getOneAddress(req, res));
  router.get("/:user_key/address", authMiddleware, (req, res) => userController.getAllAddress(req, res));
  router.get("/:user_key/order/:order_key", authMiddleware, (req, res) => userController.getItemOrderByKey(req, res));
  router.get("/:user_key/order", authMiddleware, (req, res) => userController.getItemOrderByUser(req, res));
  router.get("/:user_key", (req, res) => userController.getUserByKey(req, res));
  router.get("/", (req, res) => userController.getAllUsers(req, res));

  router.post("/register", (req, res) => userController.createUser(req, res));
  // router.post("/login/kakao", (req, res) => kakaoController.authorize(req, res));
  router.post("/login", (req, res) => userController.loginUser(req, res));
  router.post("/:user_key/address", authMiddleware, (req, res) => userController.addAddress(req, res));

  router.put("/:user_key/address/:addr_key", authMiddleware, (req, res) => userController.updateAddress(req, res));
  router.put("/:user_key/changepassword", authMiddleware, (req, res) => userController.changePassword(req, res));
  router.put("/:user_key", authMiddleware, (req, res) => userController.updateUser(req, res));

  router.delete("/:user_key/address/:addr_key", authMiddleware, (req, res) => userController.deleteAddress(req, res));

  return router;
}
