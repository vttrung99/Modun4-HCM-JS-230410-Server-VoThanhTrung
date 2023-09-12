const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export default {
addTocard:async function addToCart(userId:string, productId:string, quantity:number) {
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    // Tạo một bản ghi mới trong bảng userReceipts
    const userReceipt = await prisma.userReceipts.create({
      data: {
        userId: userId,
        total: product.price * quantity,
      },
    });

    // Tạo một bản ghi mới trong bảng userReceiptDetail
    const userReceiptDetail = await prisma.userReceiptDetail.create({
      data: {
        productId: productId,
        quantity: quantity,
        userReceiptId: userReceipt.id,
        
      },
    });

    return {
      userReceipt,
      userReceiptDetail,
      mesage:'Mua hàng Thành công',
      status: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Đã xảy ra lỗi khi thêm vào giỏ hàng");
  }
},
}
