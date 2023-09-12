// // import express, { Request, Response } from 'express';

// // interface Product {
// //   id: number;
// //   name: string;
// //   price: number;
// // }
// // const products: Product[] = [
// //   { id: 1, name: 'Product 1', price: 10 },
// //   { id: 2, name: 'Product 2', price: 20 },
// //   { id: 3, name: 'Product 3', price: 30 },
// //   // ...
// // ];
// // const app = express();
// // const port = 3000;
// // app.get('/api/products', (req: Request, res: Response) => {
// //   const query = req.query.q as string;
// //   const limit = parseInt(req.query.limit as string, 10) || 10;
// //   const searchResults = products.filter((product) =>
// //     product.name.toLowerCase().includes(query.toLowerCase())
// //   );
// //   const limitedResults = searchResults.slice(0, limit);
// //   res.json(limitedResults);
// // });
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });





// import productModel from "../models/search.model";
// import { Request, Response } from "express";

// interface Product {
//   id: string;
//   name: string;
//   avatar: string;
//   price: number;
//   des: string;
//   categoryId: string;
// }

// interface ApiResponse {
//   status: boolean;
//   data: Product[];
//   message: string;
// }

// export default {
//   searchProduct: async function(req: Request, res: Response) {
//     try {
//       let modelRes: ApiResponse = await productModel.searchProduct(req.params.product);
//       const search:Product = modelRes.filter((modelRes) => modelRes.name.toLowerCase().includes(req.params.product.toLowerCase()));

     

//       return res.status(modelRes.status ? 200 : 213).json(modelRes);
//     } catch (err) {
//       return res.status(500).json({
//         message: "Lỗi controller"
//       });
//     }
//   }
// };