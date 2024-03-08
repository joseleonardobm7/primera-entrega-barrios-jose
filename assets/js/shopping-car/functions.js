export default {
  renderQty: () => {
    const shoppingCartQty = document.getElementById("shopping-cart-qty");
    shoppingCartQty.innerHTML = shoppingCart.getTotalProducts();
  },
  modifyQty: (id, quantity) => {
    shoppingCart.addProduct(id, quantity);
    // Renderizar los productos actualizados
    renderProducts(renderedType);
  },
};
