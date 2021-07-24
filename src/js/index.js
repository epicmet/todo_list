import { openModal, closeModal, validateData, emptyInputs } from "./modal.js";

const tasks = [];

// opening and close modal
const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) {
    closeModal();
    emptyInputs();
  }
});

// submiting modal form
const modalFrom = document.querySelector(".modal__form");
modalFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //validate data and return the task object
  let task = validateData();
  tasks.push(task);
  closeModal();
  emptyInputs();
  //TODO: sort task by time
});
