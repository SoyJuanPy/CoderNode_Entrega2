import express from "express";
import { CartManager } from "../models/CartManager.js";

export const cart = () => {
	const router = express.Router();
	const cartManager = new CartManager();

	router.get("/", async (req, res) => {
		try {
			const carts = await cartManager.getAllCarts();
			res.json(carts);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener los carritos" });
		}
	});

	router.get("/:cid", async (req, res) => {
		try {
			const cid = parseInt(req.params.cid, 10);
			const cart = await cartManager.getCart(cid);
			cart
				? res.json(cart)
				: res.status(404).json({ error: "No se encontró el carrito" });
		} catch (error) {
			res.status(500).json({ error: "Error de servidor" });
		}
	});

	router.post("/:cid/product/:pid", async (req, res) => {
		try {
			const cid = parseInt(req.params.cid, 10);
			const pid = parseInt(req.params.pid, 10);
			const cart = await cartManager.addProductToCart(cid, pid);
			res.json(cart);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	});

	return router;
};
