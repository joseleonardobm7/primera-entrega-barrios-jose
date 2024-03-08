// VARIABLE DE TIPO A RENDERIZAR
let renderedType = "Todos";
// INICIALIZAR PRODUCTOS
import Products from "./products/main.js";
const { products, renderProducts } = Products;
// INICIALIZANDO CARRITO
import ShoppingCar from "./shopping-car/main.js";
const {
  shoppingCarClass,
  renderQty: renderQtyShoppingCar,
  modifyQty: modifyQtyShoppingCart,
} = ShoppingCar;
const shoppingCar = new shoppingCarClass();
// INICIALIZANDO LISTA DE DESEO
import WishList from "./wish-list/main.js";
const {
  wishListClass,
  renderQty: renderQtyWishList,
  modifyQty: modifyQtyWishList,
} = WishList;
const wishlist = new wishListClass();

renderProducts(renderedType, products);

/* 
import global from "./global/main.js";
import login from "./login/main.js";
import products from "./products/main.js";
import shoppingCart from "./shopping-car/main.js";
import wishlist from "./wish-list/main.js";
*/

/* // INICIALIZANDO CARRITO
import { shoppingCartClass } from "./products/main.js";
const shoppingCart = new shoppingCartClass();
// INICIALIZANDO LISTA DE DESEO
import { wishListClass } from "./products/main.js";
const wishlist = new wishListClass(); */
