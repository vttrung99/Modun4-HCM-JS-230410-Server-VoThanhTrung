import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default {
    searchProduct: async function(name: string) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    name
                }
            })

            return {
                status: true,
                data: products,
                message: "Lấy thông tin thành công!"
            }
        }catch(err) {
            let message: string = "lỗi model inforByUserName";
            return {
                status: false,
                data: null,
                message
            }
        }
    }

}