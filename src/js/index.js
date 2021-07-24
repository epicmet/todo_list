import { openModal, closeModal, validateData } from "./modal.js";

// opening and close modal
const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) closeModal();
});

// submiting modal form
const modalFrom = document.querySelector(".modal__form");
modalFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  validateData();
});
