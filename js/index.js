const textInput = document.getElementById("text-input");
const todoList = document.getElementById("todo-list");
const clearDataBtn = document.getElementById("clear-data");
let errorMessage = document.getElementById("error-message");
var todoListArray = [];
var storage = localStorage.getItem("todolist");
if(storage){
    todoListArray = JSON.parse(storage);
    createTodoListHTML();
}


textInput.addEventListener("keypress", e => {
    const text = textInput.value.trim();

    if (text === "" || e.key !== "Enter") {
        return;
    }

    errorMessage.textContent = "";
    add(text);

    // delete todolist html
    todoList.innerHTML = null;
    
    createTodoListHTML();
    textInput.value = "";
});

clearDataBtn.addEventListener("click", () =>{
    clearData();
})


function clearData(){
    localStorage.clear();
    todoListArray = [];
    createTodoListHTML();
}

function createTodoListHTML(){
    //　this fucntion will create a fresh todo list html 
    todoListArray = localStorage.getItem("todolist");
    if(todoListArray === null){
        // delete todolist html
        todoList.innerHTML = null;
        return 
    }
    
    todoListArray = JSON.parse(todoListArray)
    for(let i=0; i < todoListArray.length; i++){
        let text = todoListArray[i];
        let li = document.createElement("li");
        li.classList.add("list-item");

        let span = document.createElement("span");
        span.textContent = text; 

        let button = document.createElement("button");
        button.innerHTML = "&#9746;";
        button.type = "button";      //change element name!
        button.classList.add("delete-button");
        button.addEventListener("click", e => {
            remove(text);
            todoList.removeChild(e.target.closest("li"));
            errorMessage.textContent = "";
        });
        
        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    }
}

function add(text){
    let result = hasDuplicate(text);

    if (result === true){ 
        errorMessage.textContent =  `"${text}", already exists, please try some other task name!`;
        return;
    }else{
        todoListArray.push(text);
        saveInLocalStorage("todolist", todoListArray);
    }
}

function remove(text){

    let index = todoListArray.indexOf(text);
    if(index > -1){
        todoListArray.splice(index, 1)
    }
    saveInLocalStorage("todolist", todoListArray);
}

function hasDuplicate(text){
    let duplicateFound = todoListArray.includes(text);
    return duplicateFound;
}


function saveInLocalStorage(key, data){
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}