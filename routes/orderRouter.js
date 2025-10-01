import express from "express";
import { createOrder, getOrder, getQuote } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.get("/",getOrder)
orderRouter.post("/quote",getQuote)

export default orderRouter;