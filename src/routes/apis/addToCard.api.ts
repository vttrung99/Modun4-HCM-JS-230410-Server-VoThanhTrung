import express from "express";
const Router = express.Router();

import addToCard from "../../controllers/addToCard.controller";

Router.post('/',addToCard.addToCard)

export default Router;