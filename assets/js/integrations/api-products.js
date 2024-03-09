// OBTENER TODOS LOS PRODUCTOS
const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = response.json();
    return products;
  } catch (e) {
    console.error("Ocurrio un error al obtener los productos", e);
    return [];
  }
};
// OBTENER UN PRODUCTO ESPECÍFICO POR ID
const getProduct = async (productId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${1}`);
    const product = response.json();
    return product;
  } catch (e) {
    console.error("Ocurrio un error al obtener el producto", e);
    return {};
  }
};

// EXPORTAR
export default {
  getProducts,
  getProduct,
};
