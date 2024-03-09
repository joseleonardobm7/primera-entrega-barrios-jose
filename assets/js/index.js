import integrations from "./integrations/main.js";
import renders from "./renders/main.js";
import classes from "./classes/main.js";

// OBTENER Y RENDERIZAR CATEGORIAS
const categories = await integrations.categories.getCategories();
renders.categories.renderCategories(categories);

// OBTENER LOS PRODUCTOS
const products = await integrations.products.getProducts();

// MANEJAR RENDERIZADO
let renderedType = "All Products";
const changeRenderedType = (type) => {
  renderedType = type;
  renders.products.renderProducts(
    products,
    renderedType,
    categories,
    shoppingCart,
    wishList
  );
};

// INICIALIZANDO CLASES
const users = new classes.users();
const wishList = new classes.wishList();
const shoppingCart = new classes.shoppingCart();

// ABRIR MODAL DE INICIO DE SESIÓN
renders.login.showLoginModal();

// RENDERIZAR PRODUCTOS
renders.products.renderProducts(
  products,
  renderedType,
  categories,
  shoppingCart,
  wishList
);

/* 


// FUNCION PARA PROCESAR COMPRA
const processPurchase = (quantity) => {
  alert(
    "Estamos procesando tu compra, agradecemos tu paciencia y preferencia."
  );
  let message =
    "Estimado " +
    buyData.name +
    " con DNI " +
    buyData.dni +
    ", hemos procesado su compra de los siguientes articulos: \n";
  let subTotal = shoppingCart.getTotalCart();
  message += shoppingCart.listCart();
  message += "\n SubTotal: $" + subTotal;
  message += "\n IVA: $" + subTotal * 0.19;
  message += "\n Total: $" + (subTotal * 0.19 + subTotal);

  message += "\n Muchas gracias por tu compra, esperamos verte nuevamente.";
  sayBye(message);
};
 */
