let priorityColor = "red";
const modalPriorityBtn = document.querySelectorAll('.modal-priority-btn');
const modalPriorityDiv = document.querySelector(".modal-priority");
modalPriorityDiv.addEventListener("click" , (event) =>{
    if (!event.target.getAttribute("data-color")) return;
    let color = event.target.getAttribute("data-color")
    priorityColor = color;
    modalPriorityBtn.forEach((div) => {
        div.style.width = '13px';
        div.style.height = '13px';
    });
    event.target.style.width = '16px';
    event.target.style.height = '16px';
});

let items = [];
const taskText = document.querySelector('.task-text')
const taskDate = document.querySelector('.task-date')
const taskTime = document.querySelector('.task-time')
const newTask = () => {
    if (taskText.value === "") {
        alert("Please fill up every inputs");
    }
    else {
        let obj = {
            title : taskText.value,
            date : taskDate.value,
            time : taskTime.value,
            color : priorityColor,
            done : false
        }
        items.push(obj);
        addTask(obj);
    }
};
const addTask = (obj) => {
    let task = document.createElement('div');
    task.classList.add('box');
    task.innerHTML = `
                    <div class="text-box-div">
                        <button class="priority-btn"></button>
                        <div class="box-text">
                            <p class="item-text">${obj.title}</p>
                            <p class="item-date">${obj.date} - ${obj.time}</p>
                        </div>
                    </div>
                    <div class="check-box-div">
                        <input type="checkbox" class="check-box">
                    </div>
                    `
        itemDiv.appendChild(task);
        const allTasks = document.querySelectorAll(".priority-btn")
        const taskPriorityBtn = allTasks[allTasks.length-1]
        taskPriorityBtn.style.backgroundColor = obj.color;
        const checkBoxAll = document.querySelectorAll('.check-box')
        let checkBox = checkBoxAll[checkBoxAll.length -1]
        onTask(checkBox,task);
        closeModal();
};
const addBtn = document.querySelector('.btn')
const closeBtn = document.querySelector('.close')
const modal = document.querySelector('.modal')
const showModal = () => {
    modal.style.display = "block";
};
const closeModal = () => { 
    modal.style.display = "none";
    taskText.value = "";
    taskTime.value = "";
    taskDate.value = "";
    modalPriorityBtn.forEach((div) => {
        div.style.width = '13px';
        div.style.height = '13px';
    });
};
addBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);

const modalAddBtn = document.querySelector('.modal-btn')
const middleDiv = document.querySelector('.middle-container')
const itemDiv = document.querySelector('.item')
modalAddBtn.addEventListener('click', ()=> {
    newTask();
    if (itemDiv.innerHTML !== "") {
        middleDiv.style.display = "none";
    }
});

const onTask = (i,task) => {
    i.addEventListener('click', ()=>{
        task.classList.toggle('checked-task')
        let x = setTimeout(()=>{
            if(i.checked){
                task.remove()
            }
            else return;
        },2000)
    });
};