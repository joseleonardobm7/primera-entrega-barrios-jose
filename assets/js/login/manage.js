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

export { showLoginAddModal, closeLoginAddModal };
