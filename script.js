let draggedTask = null;

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// ADD TASK
function addTask(columnId){

let taskText = prompt("Enter task");

if(taskText === "" || taskText === null) return;

const priority = document.getElementById("priority").value;
const dueDate = document.getElementById("dueDate").value;

createTask(taskText, columnId, priority, dueDate);

saveTasks();
}

// CREATE TASK ELEMENT
function createTask(text, columnId, priority, dueDate){

let task = document.createElement("div");
task.className = "task";
task.draggable = true;

task.innerHTML = `
<p>${text}</p>
<span class="priority ${priority}">${priority}</span>
<br>
<small>Due: ${dueDate}</small>
<br>
<button class="delete-btn">Delete</button>
`;

task.addEventListener("dragstart", dragStart);

// DELETE BUTTON
task.querySelector(".delete-btn").onclick = function(){
    task.remove();
    saveTasks();
    updateCounts();
};

document.getElementById(columnId).appendChild(task);

// UPDATE COUNTER AFTER ADDING TASK
updateCounts();
}
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
updateCounts();
};

// BUTTON CONTAINER
let actions = document.createElement("div");
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

// APPEND
task.appendChild(span);
task.appendChild(actions);

document.getElementById(columnId).appendChild(task);
updateCounts();




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

function updateCounts(){
document.getElementById("todo-count").innerText = document.getElementById("todo").children.length;
document.getElementById("progress-count").innerText = document.getElementById("progress").children.length;
document.getElementById("done-count").innerText = document.getElementById("done").children.length;
}