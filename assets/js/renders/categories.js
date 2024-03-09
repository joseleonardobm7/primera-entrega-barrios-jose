const renderCategories = (categories) => {
  let container = document.getElementById("categories-container");
  let content = "";
  for (const category of categories) {
    content += `<li><a class="dropdown-item" href="#"> ${category} </a></li>`;
  }
  container.innerHTML = content;
};
export default {
  renderCategories,
};
