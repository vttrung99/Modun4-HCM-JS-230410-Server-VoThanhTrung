import express from "express";
const Router = express.Router();

import authController from "../../controllers/auth.controller";
import token from '../../middlewares/token'

Router.get('/email-confirm/:token', token.validateToken, authController.confirmEmail)
Router.get('/', token.validateToken, authController.authentication)
export default Router;