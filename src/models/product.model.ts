import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function(newProduct: any, productPictures: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    productPictures: {
                        createMany: {
                            data: [
                                ...productPictures
                            ]
                        }
                    }
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Tạo sản phẩm thành công !",
                data: product
            }
        }catch(err) {
            console.log("lỗi model product", err)
            return {
                status: false,
                message: "Lỗi model product create",
                data: null
            }
        }
    },
    finfindByProduct: async function(productId:string) {
        try {
            let products = await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include:{
                    productPictures:true
                }
            });
            return {
                status: true,
                message: "Get products ok!",
                data: products
            }
        }catch(err) {
            return {
                status: false,
                message: "Lỗi model finfindByProduct",
                data: null
            }
        }
    },
      delete: async function(productId: string) {
        try {
          // Lấy thông tin sản phẩm hiện tại
          const currentProduct = await prisma.products.findUnique({
            where: {
              id: productId
            }
          });
      
          if (!currentProduct) {
            return {
              status: false,
              message: "Không tìm thấy sản phẩm",
              data: null
            };
          }
      
          // Cập nhật trường sell thành giá trị ngược của nó
          const updatedProductData = await prisma.products.update({
            where: {
              id: productId
            },
            data: {
              sell: !currentProduct.sell
            }
          });
      
          return {
            status: true,
            message: "Cập nhật sản phẩm thành công!",
            data: updatedProductData
          };
        } catch (err) {
          console.log("Lỗi model product update", err);
          return {
            status: false,
            message: "Lỗi model products update",
            data: null
          };
        }
      }
}
