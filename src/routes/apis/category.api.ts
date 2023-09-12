import express from "express";
const Router = express.Router();

import categoryController from "../../controllers/category.controller";

Router.get("/category/:categoryId", categoryController.findByCategory);
Router.get('/category', categoryController.findAllCategories);
Router.get('/', categoryController.findMany)
Router.post('/', categoryController.createCategoy)
export default Router;