import addToCard from "../models/addToCard.model";
import { Request, Response } from "express";
export default {
addToCard: async function (req:Request,res:Response) {
    try{
        let card = await addToCard.addTocard(req.body.userId,req.body.productId,req.body.quantity)
        return res.status(card?.status? 200 : 214).json(card)
    }catch(err){
        return res.status(500).json({
            message: "Lỗi controller"
        })
    }
}
}