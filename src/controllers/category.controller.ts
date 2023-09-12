import categoryModel from "../models/category.model";
import { Request, Response } from "express";

export default {
    findMany: async function(req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findByCategory: async function (req:Request, res:Response) {
        try {
            let result = await categoryModel.findByCategory(req.params.categoryId);

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    findAllCategories: async (req:Request, res:Response) => {
        try {
            let modelRes = await categoryModel.findAll()

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    createCategoy: async function (req:Request, res:Response) {
        try{
            let modelRes = await categoryModel.createCaregory(req.body)
            return res.status(modelRes?.status ? 200 : 214).json(modelRes)
        }catch(err){

        }
    }
}
//gọi viết ở đâu
//chưa gọi a
//e chưa viết
//viét trong này luôn hay sao