import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
interface Title{
    id: string;
    title: string;
    active: boolean;
    avatar: string;
}

export default {
    findMany: async function() {
        try {
            let categories = await prisma.categories.findMany();
            console.log("🚀 ~ file: category.model.ts:8 ~ findMany:function ~ categories:", categories)

            return {
                status: true,
                message: "lây categories thành công!",
                data: categories
            }
        }catch(err) {
            return {
                status: false,
                message: "Lỗi model find many category",
                data: null
            }
        }
    },
    findByCategory: async function (categoryId:string) {
        // console.log("category_id", category_id)
        try {
            let category = await prisma.categories.findMany({
                where: {
                    id: categoryId
                },
                include:{
                    products:true
                }
            });
            return {
                message: "lấy sản phẩm thành công!",
                data: category
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi không xác định!s"
            }
        }
    },
    findAll: async () => {
        try {
            let categories = await prisma.categories.findMany({
                include:{
                    products:true
                }
            })
            
            return {
                status: true,
                message: "Lấy tất cả sản phẩm thành công!",
                data: categories
            }
        } catch (err) {
            return {
                status: false,
                message: "get all product that bai"
            }
        }
    },
    createCaregory: async (category: Title) => {
        try {
            let result = await prisma.categories.create({
                data: category
    
            })
            return {
                data:result,
                message: "Thêm category thành công",
                status: true,
            }
        } catch (err) {
            console.log("err", err);
    
        }
    }
}



// server.use("/test", async (req, res) => {
//     try {
//         let result = await prisma.categories.create({
//             data: req.body

//         })
//         res.json(result)
//     } catch (err) {
//         console.log("err", err);

//     }
// })