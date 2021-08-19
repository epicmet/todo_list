import {
  openModal,
  closeModal,
  validateData,
  removeErrorClass,
} from "./modal.js";

let tasksArr = [];

// opening and close modal
const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) {
    closeModal();
  }
});

// submiting modal form to validate
const modalFrom = document.querySelector(".modal__form");
modalFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //validate data and return the task object
  let valid = validateData();
  if (valid) makeTask();
  //TODO: sort task by time
});

// after validation make the task
const makeTask = () => {
  removeErrorClass();

  const todoInputValue = document.querySelector(".modal__input").value;
  const dateInputValue = document.querySelector(".modal__date").value;

  const id = Date.now();

  tasksArr.push({
    text: todoInputValue,
    date: dateInputValue,
    id: id,
  });

  render(tasksArr);

  closeModal();
};

const render = (arr) => {
  const allTasks = document.querySelectorAll(".task");

  // Clear tasksSection
  for (let task of allTasks) {
    task.remove();
  }

  // Rerender every task
  for (let taskObj of arr) {
    const { text, date, id } = taskObj;
    // Making article tag and adding its classList
    const article = document.createElement("article");
    article.classList.add("task");

    // Making task texts that include the message for task and date
    const textDiv = document.createElement("div");
    textDiv.classList.add("task__texts");
    const todoText = document.createElement("p");
    todoText.classList.add("task__todo");
    todoText.innerHTML = text;
    const dateText = document.createElement("p");
    dateText.classList.add("task__date");
    dateText.innerHTML = date;
    textDiv.appendChild(todoText);
    textDiv.appendChild(dateText);

    // Making buttons for each task
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task__buttons");
    const removeImage = document.createElement("img");
    removeImage.classList.add("task__action");
    removeImage.src =
      "https://img.icons8.com/fluency/240/000000/delete-sign.png";
    const editBtnDiv = document.createElement("div");
    editBtnDiv.classList.add("task__edit");
    editBtnDiv.innerHTML = "Edit";
    buttonsDiv.appendChild(removeImage);
    buttonsDiv.appendChild(editBtnDiv);

    // EventListener functions for each button
    makeRemoveEvent(removeImage, article, id);

    // Appending textDiv and ButtonsDiv to article
    article.appendChild(textDiv);
    article.appendChild(buttonsDiv);

    // Appending article to tasks sections in dom
    document.querySelector(".tasks").appendChild(article);
  }
};

const makeRemoveEvent = (btn, task, id) => {
  let clicked = false;
  let timeOut;

  btn.addEventListener("click", () => {
    if (clicked) {
      clicked = false;
      clearTimeout(timeOut);
      task.classList.remove("done");
    } else {
      clicked = true;
      task.classList.add("done");

      timeOut = setTimeout(() => {
        if (clicked) {
          tasksArr = tasksArr.filter((task) => task.id !== id);
          render(tasksArr);
          // task.remove();
        }
      }, 2000);
    }
  });
};
