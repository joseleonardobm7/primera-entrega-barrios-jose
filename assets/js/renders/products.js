import renders from "../renders/main.js";

const generateStarsRatings = (rate, low, up) => {
  const rating = rate || 0;
  const icon =
    rating <= low
      ? " bi-star"
      : rating > low && rating < up
      ? " bi-star-half"
      : " bi-star-fill";
  return icon;
};

const renderProducts = (
  products,
  typeSelected,
  categories,
  shoppingCart,
  wishList
) => {
  let title = document.getElementById("title-products");
  let container = document.getElementById("products-container");
  let productList = "";
  const types = {};
  categories.forEach((c) => {
    types[c] = { title: c, filter: (product) => product.category === c };
  });
  types["All Products"] = {
    title: "Todos Los Productos",
    filter: (product) => product,
  };
  types["Shopping Cart"] = {
    title: "Mi Carrito de Compras",
    filter: (product) => shoppingCart.idProducts().includes(product._id),
    aditional: `<button type="button" class="btn btn-success ms-2 ${
      shoppingCart.getTotalCart() > 0 ? "" : "disabled"
    }"> Procesar Compra </button>`,
  };
  types["Wish List"] = {
    title: "Mi Lista de Deseo",
    filter: (product) => wishList.products.includes(product._id),
  };
  const selectedData = types[typeSelected];
  const selectedProducts = products.filter(selectedData.filter);
  const selectedTitle = selectedData.title;
  selectedProducts.forEach((product) => {
    productList += `<div class="d-flex justify-content-center container-product">
    <div class="card border-0 rounded-0 shadow m-1" style="max-width: 18rem;">
    <img src="${
      product?.image
    }" style="width: 300px; height: 300px;" class="card-img-top rounded-0 img-fluid" alt="${
      product?.title || "image"
    } - ${product?.description || "description"}">

      <div class="card-body mt-3 bgColorTerciary">
        <div class="row">
          <div class="col-10">
            <h4 class="card-title"> ${product.title}</h4>
            <p class="card-text">
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                0,
                1
              )}"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                1,
                2
              )}"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                2,
                3
              )}"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                3,
                4
              )}"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                4,
                5
              )}"></i>
              (${product?.rating?.count || 0})
            </p>
          </div>
          <div class="col-2">
            <a class="text-decoration-none" href="#" onclick="manageProductsWishList(event,${
              product._id
            })">
              <i class="bi
                bi-bookmark-${
                  !wishList.products.includes(product._id) ? "plus" : "dash"
                } 
                fs-2 
                text-${
                  !wishList.products.includes(product._id)
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
              shoppingCart.idProducts().includes(product._id) ? "" : " disabled"
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
  title.innerHTML = `<h5 class="h2"> ${selectedData.title} (${products
    .filter(selectedData.filter)
    .length.toLocaleString("de-DE")}) ${selectedData.aditional || ""} </h5>`;
  renders.shoppingCart.renderShoppingCartQty(shoppingCart);
  renders.wishList.renderWishListQty(wishList);
};

export default {
  renderProducts,
};
