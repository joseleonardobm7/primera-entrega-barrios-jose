const getCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categories = response.json();
  return categories;
};

// EXPORTAR
export default {
  getCategories,
};
