const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const cleartBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// ADD EVENT LISTNERS

loadEventListeners();
function loadEventListeners() {
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
cleartBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', fliterTasks);
}
function addTask(e) {
    if(taskInput.value === '') {
        alert('Please add a task');
    }
    // CREATE A TASKLIST
const li = document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(taskInput.value));
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class="fa fa-remove"></li>';
li.appendChild(link);
tasklist.appendChild(li);
taskInput.value = '';

e.preventDefault();
}

// REMOVE TASK LIST

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// CLEAR TASKS

function clearTasks() {
   // tasklist.innerHTML = '';

    while(tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
}


// FILTER TASKS

function fliterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else { task.style.display = 'none';

        }
    });

}

// STORE TASK IN LOCAL STORAGE

storeTaskInLocalStorage(taskInput.value);
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


