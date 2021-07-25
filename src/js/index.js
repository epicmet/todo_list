import {
  openModal,
  closeModal,
  validateData,
  removeErrorClass,
} from "./modal.js";

const arr = [];

// opening and close modal
const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) closeModal();
});

// submiting modal form to validate
const modalFrom = document.querySelector(".modal__form");
modalFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = validateData();
  if (valid) makeTask();
});

// after validation make the task
const makeTask = () => {
  removeErrorClass();

  const todoInputValue = document.querySelector(".modal__input").value;
  const dateInputValue = document.querySelector(".modal__date").value;

  arr.push({
    text: todoInputValue,
    date: dateInputValue,
    priBtn: "red",
  });

  closeModal();
  console.log(arr);
};
