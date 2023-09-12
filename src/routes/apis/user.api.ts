import express from "express";
const Router = express.Router();
import userController from "../../controllers/user.controller";

Router.post('/login', userController.login)
Router.post('/', userController.register)

export default Router;