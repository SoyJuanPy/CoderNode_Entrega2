import express from "express";
import { ProductManager } from "../models/ProductManager.js";

export const products = (io) => {
  const router = express.Router();
  const productManager = new ProductManager(io);

  router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
  });

  router.post("/", async (req, res) => {
    try {
      const product = req.body;
      const newProduct = await productManager.addProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al agregar producto" });
    }
  });

  return router;
};
