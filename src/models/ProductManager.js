export class ProductManager {
  constructor(io) {
    this.io = io;
  }

  async getProducts() {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async addProduct(product) {
    const data = await readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);

    await writeFile(filePath, JSON.stringify(products, null, 2));

    this.io.emit("updateProducts", products);

    return product;
  }
}
