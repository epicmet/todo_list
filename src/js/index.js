import { openModal, closeModal, validateData } from "./modal.js";

const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) closeModal();
});

document.querySelector(".modal__form").addEventListener("submit", (e) => {
  e.preventDefault();
});

const modalAddBtn = document.querySelector(".modal__button");
modalAddBtn.addEventListener("click", (e) => {
  validateData();
});
// add enter event listener
