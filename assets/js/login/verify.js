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
export { showLoginModal, closeLoginModal };
