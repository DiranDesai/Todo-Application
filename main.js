const todoForm = document.querySelector(".todo-form");
const taskInput = document.querySelector(".task");
const todoList = document.querySelector(".todo-list");
const alert = document.querySelector(".alert");

let tasks = getStorage();


function renderTasks(){
    todoList.innerHTML = "";
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function handleSubmit(e) {
  e.preventDefault();

  const taskValue = taskInput.value;

  if (!taskValue) {
    handleErrorMsg("Please enter a Task");
    return;
  }

  const task = {id: Math.floor(Math.random() * 1000000), name: taskValue, complete: false}
  tasks.push(task);
  updateStorage();
  createTaskElement(task);

  taskInput.value = "";
}

function updateStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getStorage(){
    if (localStorage.getItem("tasks") !== null) {
        return JSON.parse(localStorage.getItem("tasks"));
    } else{
        return [];
    }
}

function createTaskElement(task) {

    const {id, name, complete} = task;

    let checkedStatus = complete ? "checked" : null;
    let nameThrough = complete ? "line-through" : null;

    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
        <div>
            <input type="checkbox" class="task-check" ${checkedStatus}>
            <p class=${nameThrough}>${name}</p>
        </div>
        <div>
            <i class="material-icons trash-btn">clear</i>
        </div>
        `;

    todoList.appendChild(li);

    const taskCheck = li.querySelector(".task-check");
    const taskTrash = li.querySelector(".trash-btn");

    taskCheck.addEventListener("click", (e) => {
        completeTaskFunc(e, id);
    });
    taskTrash.addEventListener("click", () => {
        li.remove();
        deleteTaskFunc(id);
    });
}

function completeTaskFunc(e, id){
    const checkedStatus = e.target.checked;
    const findTask = tasks.find(task => task.id === id);

    checkedStatus ? findTask.complete = true : findTask.complete = false;

    updateStorage();
    renderTasks();
}

function deleteTaskFunc(id){
    tasks = tasks.filter(task => task.id !== id);
    updateStorage();
}

function handleErrorMsg(msg) {
  alert.classList.remove("hide");
  alert.innerText = msg;

  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
}

function loadApp(){
    renderTasks();
}

todoForm.addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", loadApp);