// BIENVENIDA Y MENSAJE INICIAL
alert('Bienvenido al simulador de compras de "La Tiendita de la Esquina - Chile", para iniciar tu proceso de compra, por favor ingresa los siguientes datos.');

const buyData = {};

// FUNCION PARA SOLICITAR DATOS
const dataRequest = () => {
  nameRequest();
}

// FUNCION PARA INGRESAR NOMBRE
const nameRequest = () => {
  const name = prompt('Ingresa tu Nombre');
  if (!name || name.length < 2) return invalidName(name);
  buyData.name = name;
  dniRequest(name);
}

// FUNCION PARA NOMBRE INVALIDO
const invalidName = (name) => {
  let message;
  if (!name) message = 'No ingresaste nombre. ';
  else message = 'El nombre ingresado es muy corto. ';
  const response = prompt(message + ' Por favor ingresa una opción: \n 1 -> Ingresar nuevamente el nombre.\n Otro valor -> Cancelar Simulación.');
  if (response == 1) nameRequest();
  else return sayBye();
}

// FUNCION PARA INGRESAR DNI
const dniRequest = (name) => {
  const dni = prompt('Hola ' + name + ' , ingresa tu DNI:');
  if (!dni ) return invalidDni(name);
  buyData.dni = dni;
  productsQuantity();
}

// FUNCION PARA DNI INVALIDO
const invalidDni = (name) => {
  const response = prompt('No ingresaste ningún DNI, por favor ingresa una opción: \n 1 -> Ingresar nuevamente el DNI.\n 2. Comenzar nuevamente el proceso de compra. \n Otro valor -> Cancelar Simulación.');
  if (response == 1) return dniRequest(name);
  else if (response == 2) return dataRequest();
  else return sayBye();
}

// FUNCION PARA CANTIDAD DE PRODUCTOS
const productsQuantity = () => {
  const quantity = parseInt(prompt('Cuantos productos deseas comprar'));
  if (!quantity || quantity < 1 || quantity > 3 ) return invalidProductsQuantity();
  buyData.quantity = quantity;
  productsRequest(quantity);
}

// FUNCION PARA CANTIDAD DE PRODUCTOS INVÁLIDA
const invalidProductsQuantity = () => {
  const response = prompt('La cantidad de productos debe estar entre 1 - 3, por favor ingresa una opción: \n 1 -> Ingresar nuevamente la cantidad.\n 2. Comenzar nuevamente el proceso de compra. \n Otro valor -> Cancelar Simulación.');
  if (response == 1) return productsQuantity();
  else if (response == 2) return dataRequest();
  else return sayBye();
}

// FUNCION PARA SELECCIONAR PRODUCTOS
const productsRequest = (quantity) => {
  for (let i = 1; i <= quantity; i++ ){
    let selected = false;
    do {
      selected = productChoose(i);

    } while (!selected)
  }
  productQuantityRequest(quantity)
}

// FUNCION PARA ELEGIR PRODUCTO
const productChoose = (productNumber) => {
  const manzana = '1 -> Manzana - Precio: $2000. \n';
  const pera = '2 -> Pera - Precio: $2500. \n';
  const uva = '3 -> Uva - Precio: $4000. \n';
  const fresa = '4 -> Fresa - Precio: $1000. \n';
  const durazno = '5 -> Durazno - Precio: $5000. \n';
  const message = 'Ingrese una opción para elegir el producto ' + productNumber + ': \n' + manzana + pera + uva + fresa + durazno;
  const response = parseInt(prompt(message));
  switch (response) {
    case 1: 
      buyData['nombreProducto'+productNumber] = 'Manzana';
      buyData['precioProducto'+productNumber] = 2000;
      break
    case 2: 
      buyData['nombreProducto'+productNumber] = 'Pera';
      buyData['precioProducto'+productNumber] = 2500;
      break
    case 3: 
      buyData['nombreProducto'+productNumber] = 'Uva';
      buyData['precioProducto'+productNumber] = 4000;
      break
    case 4: 
      buyData['nombreProducto'+productNumber] = 'Fresa';
      buyData['precioProducto'+productNumber] = 1000;
    case 5: 
      buyData['nombreProducto'+productNumber] = 'Durazno';
      buyData['precioProducto'+productNumber] = 5000;
      break;
    default: 
      break;
  };
  return response >= 1 && response <= 5;
}

// FUNCION PARA SELECCIONAR CANTIDADES DE PRODUCTOS
const productQuantityRequest = (quantity) => {
  for (let i = 1; i <= quantity; i++ ){
    let selected = false;
    do {
      selected = quantityChoose(i,buyData['nombreProducto'+i]);
    } while (!selected)
  }
  processPurchase(quantity);
}

// FUNCION PARA ELEGIR CANTIDADES
const quantityChoose = (productNumber,productName) => {
  const response = parseInt(prompt('Cuantas ' + productName + 's desea comprar (Cantidad del 1 al 10):'));
  const selected = response >= 1 && response <= 10;
  if (selected) buyData['cantidadProducto'+productNumber] = response;
  return selected;
}

// FUNCION PARA PROCESAR COMPRA
const processPurchase = (quantity) => {
  alert('Estamos procesando tu compra, agradecemos tu paciencia y preferencia.');
  let message = 'Estimado ' + buyData.name + ' con DNI ' + buyData.dni + ', hemos procesado su compra de los siguientes articulos: \n';
  let subTotal = 0;
  for (let i = 1; i <= quantity; i++ ){
    message += '- ' + buyData['nombreProducto'+i];
    message += ' - Cantidad: ' + buyData['cantidadProducto'+i];
    message += ' - Precio: ' + buyData['precioProducto'+i];
    message += ' => Total: $' + buyData['cantidadProducto'+i] * buyData['precioProducto'+i] + '\n';
    subTotal += buyData['cantidadProducto'+i] * buyData['precioProducto'+i];
  }
  message += '\n SubTotal: $' + subTotal;
  message += '\n IVA: $' + (subTotal * 0.19);
  message += '\n Total: $' + ((subTotal * 0.19) + subTotal);

  message += '\n Muchas gracias por tu compra, esperamos verte nuevamente.'
  sayBye(message)
}

// MENSAJE DE DESPEDIDA
const sayBye = (message) => {
  if (message) alert(message);
  else alert('Muchas gracias por tu visita, esperamos verte pronto.');
}

// INICIAR LA SOLICITUD DE DATOS
dataRequest();