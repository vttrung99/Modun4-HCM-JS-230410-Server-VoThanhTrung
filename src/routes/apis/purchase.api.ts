import express from "express";
const Router = express.Router();

import purchaseController from "../../controllers/purchase.coltroller";
Router.post('/order-history', purchaseController.findGuestReceipt)
Router.post('/', purchaseController.createGuestReceipt)
Router.get('/', purchaseController.getReceipt)
export default Router;