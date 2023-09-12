import express from "express";
const Router = express.Router();

import v1 from './v1'
Router.use('/v1', v1)

export default Router;