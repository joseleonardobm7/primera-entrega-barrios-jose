// LISTAR OPCIONES DE PRODUCTOS
const listProducts = (showProducts) => {
  let res = "";
  showProducts.forEach((product) => {
    res += product._id + ".- " + product.name + " - $" + product.price + "\n";
  });
  return res;
};

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
