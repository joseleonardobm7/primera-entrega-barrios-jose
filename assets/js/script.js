let renderedType = "Todos";

// FUNCIONES A UTILIZAR
const randomNumber = (inicio, fin) => {
  return Math.floor(Math.random() * fin) + inicio;
};
// DEFINIENDO LOS PRODUCTOS DISPONIBLES
const products = [
  {
    _id: 1,
    name: "Harina",
    type: "viveres",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 2000,
    image: "harina.png",
  },
  {
    _id: 2,
    name: "Arroz",
    type: "viveres",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1000,
    image: "arroz.png",
  },
  {
    _id: 3,
    name: "Pasta",
    type: "viveres",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1500,
    image: "pasta.png",
  },
  {
    _id: 4,
    name: "Manzana",
    type: "frutasVerduras",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1200,
    image: "manzana.png",
  },
  {
    _id: 5,
    name: "Pera",
    type: "frutasVerduras",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1800,
    image: "pera.png",
  },
  {
    _id: 6,
    name: "Fresa",
    type: "frutasVerduras",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 2000,
    image: "fresa.png",
  },
  {
    _id: 7,
    name: "Durazno",
    type: "frutasVerduras",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 2500,
    image: "durazno.png",
  },
  {
    _id: 8,
    name: "Uva",
    type: "frutasVerduras",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 3000,
    image: "uva.png",
  },
  {
    _id: 9,
    name: "Jugo de Naranja",
    type: "bebidas",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1350,
    image: "jugo.png",
  },
  {
    _id: 10,
    name: "Refresco",
    type: "bebidas",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 1900,
    image: "refresco.png",
  },
  {
    _id: 11,
    name: "Agua Mineral",
    type: "bebidas",
    score: randomNumber(1, 5),
    totalRatings: randomNumber(20, 200),
    price: 900,
    image: "agua.png",
  },
];
// DEFINIENDO LA CLASE CARRITO DE COMPRAS
class shoppingCartClass {
  constructor() {
    this.products = [];
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
          name: existingProduct.name,
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
  listIdProducts() {
    return this.products.map((p) => p._id);
  }
  getProductQuantity(id) {
    const product = this.products.find((p) => p._id === id);
    return product?.quantity || 0;
  }
}

class wishListClass {
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

const renderShoppingCartQty = () => {
  const shoppingCartQty = document.getElementById("shopping-cart-qty");
  shoppingCartQty.innerHTML = shoppingCart.getTotalProducts();
};

const renderWishListQty = () => {
  const wishListQty = document.getElementById("wishlist-qty");
  wishListQty.innerHTML = wishlist.getTotalProducts();
};

// INICIALIZANDO CARRITO
const shoppingCart = new shoppingCartClass();

// INICIALIZAR WISHLIST
const wishlist = new wishListClass();

// LISTAR OPCIONES DE PRODUCTOS
const listProducts = (showProducts) => {
  let res = "";
  showProducts.forEach((product) => {
    res += product._id + ".- " + product.name + " - $" + product.price + "\n";
  });
  return res;
};

// FUNCION PARA RENDERIZAR PRODUCTOS
const renderProducts = (typeSelected) => {
  let container = document.getElementById("products-container");
  let productList = "";
  const types = {
    Todos: (product) => product,
    Viveres: (product) => product.type === "viveres",
    "Frutas y Verduras": (product) => product.type === "frutasVerduras",
    Bebidas: (product) => product.type === "bebidas",
    Carrito: (product) => shoppingCart.listIdProducts().includes(product._id),
    Favoritos: (product) => wishlist.products.includes(product._id),
  };
  const selectedProducts = products.filter(types[typeSelected]);
  selectedProducts.forEach((product) => {
    productList += `<div class="d-flex justify-content-center">
    <div class="card border-0 rounded-0 shadow m-2" style="max-width: 18rem;">
      <img src="assets/img/${
        product.image
      }" class="card-img-top rounded-0" alt="...">
      <div class="card-body mt-3 bgColorTerciary">
        <div class="row">
          <div class="col-10">
            <h4 class="card-title"> ${product.name}</h4>
            <p class="card-text">
              ${
                product.score >= 1
                  ? '<i class="bi bi-star-fill text-warning"></i>\n'
                  : ""
              }
              ${
                product.score >= 2
                  ? '<i class="bi bi-star-fill text-warning"></i>\n'
                  : ""
              }
              ${
                product.score >= 3
                  ? '<i class="bi bi-star-fill text-warning"></i>\n'
                  : ""
              }
              ${
                product.score >= 4
                  ? '<i class="bi bi-star-fill text-warning"></i>\n'
                  : ""
              }
              ${
                product.score >= 5
                  ? '<i class="bi bi-star-fill text-warning"></i>\n'
                  : ""
              }
              (${product.totalRatings})
            </p>
          </div>
          <div class="col-2">
            <a class="text-decoration-none" href="#" onclick="manageProductsWishList(event,${
              product._id
            })">
              <i class="bi
                bi-bookmark-${
                  !wishlist.products.includes(product._id) ? "plus" : "dash"
                } 
                fs-2 
                text-${
                  !wishlist.products.includes(product._id)
                    ? "success"
                    : "danger"
                }
                me-4"
              >
              </i>
            </a>
          </div>
        </div>
      </div>
      <div class="row align-items-center text-center g-0 bgColorTerciary">
        <div class="col-4 d-flex justify-content-start align-items-center px-1 ">
          <i class="bi bi-coin text-success fs-3"></i>
          <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="text-center"> <b> Precio </b> </div>
            <div class="p-2"> $${product.price.toLocaleString("de-DE")} </div>
          </div>
        </div>
        <div class="col-8 d-flex justify-content-start align-items-center bg-dark px-2">
          <i class="bi bi-cart-fill text-success fs-3"></i>
          <div class="d-flex flex-column align-items-start">
            <div class="p-2 text-white"> <b> Cantidad: </b>
              ${shoppingCart.getProductQuantity(product._id)}
            </div>
            <div class="p-2 text-white"> <b> Subtotal: </b>
              $${(
                (product.price || 0) *
                shoppingCart.getProductQuantity(product._id)
              ).toLocaleString("de-DE")}
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center text-center g-0">
        <div class="col-12 d-flex justify-content-center">
          <div
            class="btn btn-danger text-warning w-50 p-3 rounded-0 ${
              shoppingCart.listIdProducts().includes(product._id)
                ? ""
                : " disabled"
            }"
            onClick="modifyQuantity(${product._id},${-1})"
          >
            Restar Unidad
          </div>
          <div class="btn btn-success text-warning w-50 p-3 rounded-0" onClick="modifyQuantity(${
            product._id
          },${1})">
            Sumar Unidad
          </div>
        </div>
      </div>
    </div>
  </div>\n`;
  });
  if (productList === "")
    productList = `<div> No existen productos agregados ${
      renderedType === "Favoritos" ? "como favoritos." : "al carrito"
    } </div>`;
  container.innerHTML = productList;
  renderShoppingCartQty();
  renderWishListQty();
};

renderProducts(renderedType);

// BIENVENIDA Y MENSAJE INICIAL
alert(
  'Bienvenido al simulador de compras de "La Tiendita de la Esquina - Chile", para iniciar tu proceso de compra, por favor ingresa los siguientes datos.'
);
const buyData = {};

// FUNCION PARA INGRESAR NOMBRE
const nameRequest = () => {
  const name = prompt("Ingresa tu Nombre");
  if (!name || name.length < 2) return invalidName(name);
  buyData.name = name;
  dniRequest(name);
};

// FUNCION PARA NOMBRE INVALIDO
const invalidName = (name) => {
  let message;
  if (!name) message = "No ingresaste nombre. ";
  else message = "El nombre ingresado es muy corto. ";
  const response = prompt(
    message +
      " Por favor ingresa una opción: \n 1 -> Ingresar nuevamente el nombre.\n Otro valor -> Cancelar Simulación."
  );
  if (response == 1) nameRequest();
  else return sayBye();
};

// FUNCION PARA INGRESAR DNI
const dniRequest = (name) => {
  const dni = prompt("Hola " + name + " , ingresa tu DNI:");
  if (!dni) return invalidDni(name);
  buyData.dni = dni;
  //productsQuantity();
  productChoose();
};

// FUNCION PARA DNI INVALIDO
const invalidDni = (name) => {
  const response = prompt(
    "No ingresaste ningún DNI, por favor ingresa una opción: \n 1 -> Ingresar nuevamente el DNI.\n 2. Comenzar nuevamente el proceso de compra. \n Otro valor -> Cancelar Simulación."
  );
  if (response == 1) return dniRequest(name);
  else if (response == 2) return nameRequest();
  else return sayBye();
};

// FUNCION PARA ELEGIR PRODUCTO
const productChoose = () => {
  let message = "Ingrese una opción del listado:\n";
  message += "0.- Finalizar Pedido. \n";
  message += listProducts(products);
  const response = parseInt(prompt(message));
  console.log(response);
  if (response === 0) {
    if (shoppingCart.getTotalProducts() > 0) {
      return processPurchase();
    } else {
      console.log("No se puede procesar la compra con el carrito vacío.");
      return productChoose();
    }
  }
  if (response > 0 && response <= products.length)
    return quantityChoose(response);
  alert("Opción Inválida");
  return productChoose();
};

// FUNCION PARA ELEGIR CANTIDAD DEL PRODUCTO
const quantityChoose = (id) => {
  const product = products.find((p) => p._id === id);
  const response = parseInt(
    prompt(
      "Cuantas unidades de " +
        product.name +
        " desea comprar (Cantidad del 1 al 10):"
    )
  );
  const selected = response >= 1 && response <= 10;
  if (selected) {
    shoppingCart.addProduct(id, response);
    return productChoose();
  } else {
    alert("Opción Inválida");
    return quantityChoose(id);
  }
};

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

// MENSAJE DE DESPEDIDA
const sayBye = (message) => {
  if (message) alert(message);
  else alert("Muchas gracias por tu visita, esperamos verte pronto.");
};

// INICIAR LA SOLICITUD DE DATOS
//nameRequest();

// MOSTRAR/OCULTAR MODAL DE INICIO DE SESION
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  backdrop: "static",
  keyboard: false,
});
const showLoginModal = () => {
  console.log("Abre Inicio Sesión");
  loginModal.show();
};
const closeLoginModal = () => {
  console.log("Cierra Inicio Sesión");
  loginModal.hide();
};

// MOSTRAR/OCULTAR MODAL DE CREAR USUARIO
const loginAddModal = new bootstrap.Modal(
  document.getElementById("loginAddModal"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
const showLoginAddModal = () => {
  console.log("Abre Creación de Usuario");
  loginAddModal.show();
};
const closeLoginAddModal = () => {
  console.log("Cierra Creación de Usuario");
  loginAddModal.hide();
};

const modifyQuantity = (id, quantity) => {
  shoppingCart.addProduct(id, quantity);
  // Renderizar los productos actualizados
  renderProducts(renderedType);
};

const changeRenderedType = (type) => {
  renderedType = type;
  renderProducts(renderedType);
};

const manageProductsWishList = (event, id) => {
  // Detener comportamiente de href
  event.preventDefault();
  wishlist.manageProduct(id);
  // Renderizar los productos actualizados
  renderProducts(renderedType);
};
