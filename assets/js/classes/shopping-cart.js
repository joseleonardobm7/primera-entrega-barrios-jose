import global from "../global/main.js";

export default class shoppingCartClass {
  constructor() {
    this.products = global.ls.getLocalStorage("shoppingCart") || [];
  }
  addProduct(id, quantity) {
    const existingProduct = products.find((p) => p._id === id);
    if (existingProduct) {
      const addedProduct = this.products.find((p) => p._id === id);
      if (addedProduct) {
        addedProduct.quantity += quantity;
        console.log(
          "Sumaste " +
            quantity +
            " unidad(es) de " +
            existingProduct.name +
            " al Carrito!"
        );
        if (addedProduct.quantity <= 0) {
          console.log("Es menor o igual a cero");
          this.products = this.products.filter((p) => p._id != id);
        }
      } else {
        const product = {
          _id: id,
          title: existingProduct.name,
          price: existingProduct.price,
          quantity: quantity,
        };
        this.products.push(product);
        console.log(
          "Agregaste " +
            quantity +
            " unidad(es) de " +
            existingProduct.name +
            " al Carrito!"
        );
      }
    } else {
      console.log("No se encontró el Producto con #" + id + "!");
    }
    global.ls.global.ls.getLocalStorage("shoppingCart", this.products);
  }
  listCart() {
    let res = "";
    this.products.forEach((product) => {
      res +=
        product.quantity +
        " unidad(es) de " +
        product.name +
        " por $" +
        product.price +
        " c/u.\n";
    });
    return res;
  }
  getTotalProducts() {
    return this.products.length;
  }
  getTotalCart() {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }
  idProducts() {
    return this.products.map((p) => p._id);
  }
  getProductQuantity(id) {
    const product = this.products.find((p) => p._id === id);
    return product?.quantity || 0;
  }
}
