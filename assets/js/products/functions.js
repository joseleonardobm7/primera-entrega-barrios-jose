const renderProducts = (
  type,
  products,
  shoppingCarProducts,
  wishListProducts
) => {
  let container = document.getElementById("products-container");
  let productList = "";
  const types = {
    Todos: (product) => product,
    Viveres: (product) => product.type === "viveres",
    "Frutas y Verduras": (product) => product.type === "frutasVerduras",
    Bebidas: (product) => product.type === "bebidas",
    Carrito: (product) =>
      shoppingCarProducts.map((p) => p._id).includes(product._id),
    Favoritos: (product) => wishListProducts.includes(product._id),
  };
  const selectedProducts = products.filter(types[type]);
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
                  !wishListProducts.includes(product._id) ? "plus" : "dash"
                } 
                fs-2 
                text-${
                  !wishListProducts.includes(product._id) ? "success" : "danger"
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
              ${
                shoppingCarProducts.find((p) => p._id === product._id)
                  ?.quantity || 0
              }
            </div>
            <div class="p-2 text-white"> <b> Subtotal: </b>
              $${(
                (product.price || 0) *
                (shoppingCarProducts.find((p) => p._id === product._id)
                  ?.quantity || 0)
              ).toLocaleString("de-DE")}
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center text-center g-0">
        <div class="col-12 d-flex justify-content-center">
          <div
            class="btn btn-danger text-warning w-50 p-3 rounded-0 ${
              shoppingCarProducts.map((p) => p._id).includes(product._id)
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
      type === "Favoritos" ? "como favoritos." : "al carrito"
    } </div>`;
  container.innerHTML = productList;
  renderShoppingCartQty();
  renderWishListQty();
};

export default {
  // FUNCION PARA RENDERIZAR PRODUCTOS
  renderProducts,
  // FUNCION PARA CAMBIAR EL TIPO DE PRODUCTOS A RENDERIZAR
  changeRenderedType: (type, products) => {
    renderProducts(type, products);
    return type;
  },
};
