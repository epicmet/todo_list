import {
  openModal,
  closeModal,
  validateData,
  removeErrorClass,
} from "./modal.js";

let tasksArr = [];
let isEditing = false;
let editingID = null;

// Show default-bg if there is no tasks
const checkTasks = () => {
  if (tasksArr.length === 0) {
    document.querySelector(".default-bg").style.display = "flex";
    document.querySelector(".tasks").style.display = "none";
  } else {
    document.querySelector(".default-bg").style.display = "none";
    document.querySelector(".tasks").style.display = "flex";
  }
};

checkTasks();

// Opening and closing modal events
const footerBtn = document.querySelector(".footer__btn");
footerBtn.addEventListener("click", openModal);

window.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target == modal) {
    closeModal();
  }
});

// Submiting modal form
const modalFrom = document.querySelector(".modal__form");
modalFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate data make task or edit an existing task
  let valid = validateData();
  if (valid) {
    if (isEditing) {
      editTask();
    } else {
      makeTask();
    }
  }
});

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

  sortByTime();
  render(tasksArr);

  closeModal();
};

const editTask = () => {
  const index = tasksArr.findIndex((task) => task.id === editingID);
  const taskObj = tasksArr[index];
  taskObj.text = document.querySelector(".modal__input").value;
  taskObj.date = document.querySelector(".modal__date").value;

  isEditing = false;
  editingID = null;
  sortByTime();
  render(tasksArr);
  closeModal();
};

const render = (arr) => {
  checkTasks();

  // Clear tasksSection befor re-rendering
  const allTasks = document.querySelectorAll(".task");
  for (let task of allTasks) {
    task.remove();
  }

  // Re-render every task
  for (let taskObj of arr) {
    const { text, date, id } = taskObj;

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
    dateText.innerHTML = new Date(date).toDateString();
    if (dateText.innerHTML == new Date().toDateString()) {
      const span = document.createElement("span");
      span.classList.add("today");
      span.innerHTML = "Today";
      dateText.appendChild(span);
    }

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
    makeEditEvent(editBtnDiv, text, date, id);

    // Appending texts and Buttons to article
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
        }
      }, 2000);
    }
  });
};

const makeEditEvent = (btn, text, date, id) => {
  btn.addEventListener("click", () => {
    isEditing = true;
    editingID = id;
    const modal = document.querySelector(".modal");
    const modalTodo = document.querySelector(".modal__todo");
    modalTodo.value = text;
    const modalDate = document.querySelector(".modal__date");
    modalDate.value = date;

    modal.style.display = "flex";
    document.querySelector(".modal__input").focus();
  });
};

const sortByTime = () => {
  tasksArr.sort((a, b) => {
    let first = Number(a.date.replaceAll("-", ""));
    let second = Number(b.date.replaceAll("-", ""));
    return first - second;
  });
};
