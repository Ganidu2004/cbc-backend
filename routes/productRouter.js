import express from "express";
import { getProduct,createProduct,deleteProduct, getProductByName } from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get("/",getProduct)

productRouter.get("/:name",getProductByName)

productRouter.post("/",createProduct)

productRouter.delete("/",deleteProduct)

export default productRouter;