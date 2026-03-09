let draggedTask = null;

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// ADD TASK
function addTask(columnId){

let taskText = prompt("Enter task");

if(taskText === "" || taskText === null) return;

createTask(taskText, columnId);

saveTasks();
}

// CREATE TASK ELEMENT
function createTask(text, columnId){

let task = document.createElement("div");
task.className = "task";
task.draggable = true;

task.addEventListener("dragstart", dragStart);

// TEXT
let span = document.createElement("span");
span.innerText = text;

// EDIT BUTTON
let editBtn = document.createElement("button");
editBtn.innerText = "✏️";

editBtn.onclick = function(){

let newText = prompt("Edit task", span.innerText);

if(newText !== "" && newText !== null){
span.innerText = newText;
saveTasks();
}

};

// DELETE BUTTON
let deleteBtn = document.createElement("button");
deleteBtn.innerText = "❌";

deleteBtn.onclick = function(){
task.remove();
saveTasks();
};

// BUTTON CONTAINER
let actions = document.createElement("div");
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

// APPEND
task.appendChild(span);
task.appendChild(actions);

document.getElementById(columnId).appendChild(task);

}

// DRAG START
function dragStart(){
draggedTask = this;
}

// DROP ZONES
let columns = document.querySelectorAll(".task-list");

columns.forEach(column => {

column.addEventListener("dragover", function(e){
e.preventDefault();
});

column.addEventListener("drop", function(){

this.appendChild(draggedTask);

saveTasks();

});

});

// SAVE TO LOCALSTORAGE
function saveTasks(){

let data = {
todo:[],
progress:[],
done:[]
};

document.querySelectorAll("#todo .task span").forEach(task=>{
data.todo.push(task.innerText);
});

document.querySelectorAll("#progress .task span").forEach(task=>{
data.progress.push(task.innerText);
});

document.querySelectorAll("#done .task span").forEach(task=>{
data.done.push(task.innerText);
});

localStorage.setItem("kanbanData", JSON.stringify(data));

}

// LOAD FROM LOCALSTORAGE
function loadTasks(){

let data = JSON.parse(localStorage.getItem("kanbanData"));

if(!data) return;

data.todo.forEach(task => createTask(task,"todo"));
data.progress.forEach(task => createTask(task,"progress"));
data.done.forEach(task => createTask(task,"done"));

}