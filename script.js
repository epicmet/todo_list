const modalPriorityBtn = document.querySelectorAll('.modal-priority-btn');
let priorityColor;
const remainingIndexes = (num) => {
    for(let i=0;i<4;i++){
        if (i !== num){
            modalPriorityBtn[i].style.width= '13px';
            modalPriorityBtn[i].style.height= '13px';
        }
    }
};
const selectedmodalPriorityBtn = (index) =>{
    modalPriorityBtn[index].style.width= '16px';
    modalPriorityBtn[index].style.height= '16px';
    remainingIndexes(index)
    priorityColor = index;
}

document.querySelector(".modal-priority").addEventListener("click" , (event) =>{
    let color = event.target.getAttribute("data-color")
    priorityColor = color;
    })

// modalPriorityBtn[0].addEventListener('click', (e)=> {
//     modalPriorityBtn[0].style.width= '16px';
//     modalPriorityBtn[0].style.height= '16px';
//     selectedmodalPriorityBtn(0)
//     console.log(e)
// });
// modalPriorityBtn[1].addEventListener('click', (e)=> {
//     modalPriorityBtn[1].style.width= '16px';
//     modalPriorityBtn[1].style.height= '16px';
//     selectedmodalPriorityBtn(1)
// });
// modalPriorityBtn[2].addEventListener('click', (e)=> {
//     modalPriorityBtn[2].style.width= '16px';
//     modalPriorityBtn[2].style.height= '16px';
//     selectedmodalPriorityBtn(2)
// });
// modalPriorityBtn[3].addEventListener('click', (e)=> {
//     modalPriorityBtn[3].style.width= '16px';
//     modalPriorityBtn[3].style.height= '16px';
//     selectedmodalPriorityBtn(3)
// });

let items = [];
const taskText = document.querySelector('.task-text')
const taskDate = document.querySelector('.task-date')
const taskTime = document.querySelector('.task-time')
const newTask = () => {
    if (taskText.value === "" || taskDate.value === "" || taskTime.value === "") {
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
        items.  push(obj);
        addTask(obj);
        // itemDiv.innerHTML = "";
        // for (item of items) {
        //     addTask(item)
        // };
    }
};
const addTask = (obj) => {
    let task = document.createElement('div');
    task.classList.add('box');
    task.innerHTML = `
                    <div class="text-box-div">
                        <button class="priority-btn" style= "backgroundColor:${obj.color};"></button>
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
        // const taskPriorityBtn = document.querySelector('.priority-btn');
        // taskPriorityBtn.style.backgroundColor = obj.color;
        // if(obj.color === 0) {
        //     taskPriorityBtn.style.backgroundColor = 'red';
        // }
        // else if(obj.color === 1) {
        //     taskPriorityBtn.style.backgroundColor = 'blue';
        // }
        // else if(obj.color === 2) {
        //     taskPriorityBtn.style.backgroundColor = 'green';
        // }
        // else if(obj.color === 3) {
        //     taskPriorityBtn.style.backgroundColor = 'yellow';
        // }
        // else {
        //     taskPriorityBtn.style.backgroundColor = 'red';
        // }
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
    remainingIndexes(4); //to resize all priority buttons
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
})