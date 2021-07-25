export const openModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
  document.querySelector(".modal__input").focus();
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
    todoInput.focus();
    return false;
  }

  if (!dateInput.value) {
    dateInput.classList.add("error");
    return false;
  }

  return true;
};

export const removeErrorClass = () => {
  document.querySelector(".modal__input").classList.remove("error");
  document.querySelector(".modal__date").classList.remove("error");
};

export const emptyInputs = () => {
  document.querySelector(".modal__input").value = "";
  document.querySelector(".modal__date").value = "";
};
