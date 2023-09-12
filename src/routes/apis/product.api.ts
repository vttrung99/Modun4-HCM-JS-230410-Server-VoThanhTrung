import express from "express";
const Router = express.Router();
import productController from "../../controllers/product.controller";
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
  })
  const upload = multer({ storage: storage })
Router.post('/',upload.array('imgs'), productController.create)
Router.get('/:productId', productController.finfindByProduct)
Router.delete('/:productId', productController.delete)
export default Router;