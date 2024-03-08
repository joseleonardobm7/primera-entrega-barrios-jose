export default {
  renderQty: () => {
    const wishListQty = document.getElementById("wishlist-qty");
    wishListQty.innerHTML = wishlist.getTotalProducts();
  },
  modifyQty: (event, id) => {
    // Detener comportamiente de href
    event.preventDefault();
    wishlist.manageProduct(id);
    // Renderizar los productos actualizados
  },
};
