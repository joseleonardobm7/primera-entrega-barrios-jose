export default class wishListClass {
  constructor() {
    this.products = [];
  }
  manageProduct(id) {
    const product = this.products.find((p) => p === id);
    if (product) this.products = this.products.filter((p) => p !== id);
    else this.products.push(id);
  }
  getTotalProducts() {
    return this.products.length;
  }
}
