export const openModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
};

export const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};

export const validateData = () => {
  const todoInput = document.querySelector(".modal__input");
  const dateInput = document.querySelector(".modal__date");

  todoInput.addEventListener("keydown", () => {
    removeErrorClass();
  });
  dateInput.addEventListener("click", (e) => {
    removeErrorClass();
  });

  if (!todoInput.value) {
    todoInput.classList.add("error");
    return;
  }

  if (!dateInput.value) {
    dateInput.classList.add("error");
    return;
  }

  makeTask();
};

const makeTask = () => {
  removeErrorClass();

  console.log("also here");
};

const removeErrorClass = () => {
  document.querySelector(".modal__input").classList.remove("error");
  document.querySelector(".modal__date").classList.remove("error");
};
