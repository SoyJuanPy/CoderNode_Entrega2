import { readFile, writeFile } from "fs/promises";
import path from "path";
import { ProductManager } from "./ProductManager.js";

const cartFilePath = path.resolve(__dirname, "../data/carrito.json");

const productManager = new ProductManager();

export class CartManager {
	async getAllCarts() {
		try {
			const data = await readFile(cartFilePath, "utf-8");
			console.log("Datos leídos de carrito.json:", data);
			const carts = JSON.parse(data);
			console.log("Carritos obtenidos:", carts);
			return carts;
		} catch (error) {
			console.error("Error al obtener carritos:", error);
			throw new Error("Error al obtener carritos");
		}
	}

	async getCart(cid) {
		try {
			const data = await readFile(cartFilePath, "utf-8");
			const carts = JSON.parse(data);
			return carts.find((cart) => cart.id === cid) || null;
		} catch (error) {
			console.error("Error al obtener carrito:", error);
			throw new Error("Error al obtener el carrito");
		}
	}

	async addProductToCart(cid, pid) {
		try {
			const data = await readFile(cartFilePath, "utf-8");
			const carts = JSON.parse(data);
			let cart = carts.find((cart) => cart.id === cid);

			const productExists = await productManager.getProductById(pid);
			if (!productExists) {
				throw new Error(`El producto con ID ${pid} no existe.`);
			}

			if (!cart) {
				cart = { id: cid, products: [] };
				carts.push(cart);
			}

			const productIndex = cart.products.findIndex((p) => p.product === pid);
			if (productIndex !== -1) {
				cart.products[productIndex].quantity += 1;
			} else {
				cart.products.push({ product: pid, quantity: 1 });
			}

			await writeFile(cartFilePath, JSON.stringify(carts, null, 2));
			return cart;
		} catch (error) {
			console.error("Error al agregar producto al carrito:", error);
			throw error;
		}
	}
}
