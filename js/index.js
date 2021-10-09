const textInput = document.getElementById("text-input");
const todoList = document.getElementById("todo-list");
const clearDataBtn = document.getElementById("clear-data");
let errorMessage = document.getElementById("error-message");
var todoListArray = [];
var storage = localStorage.getItem("todolist");
if(storage){
    todoListArray = JSON.parse(storage);
    createTodoListHTML();  //これがあるから、HTML上にlistが見れる
}


/*
HOw to find a bug and investigate:
- Clearly state what is the  bug.
******
When i add todolist, the last entry disappears.


- Reproduce the bug and identify the exact steps to cause  it again.
******
enter a todolist
enter  one more todo list  
all is fine 
delete one of the todo list
enter a new todolist
suddenly one of the prev todo list disappears



- Use  console.log to  check each step is correctly being  executed  or not.
- Find  the line/lines of code that cause the bug.
- Make a fix.
*/


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

//  todoListArray = ["ash", "miki", "monkey"];
// todoListArray[0]
clearDataBtn.addEventListener("click", () =>{
    clearData();
})


function clearData(){
    localStorage.clear(); // this step will make todoListArray null
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
    for(let i=0; i < todoListArray.length; i++){ // this will loop 3 times
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
    // check for duplicate
    console.log("inside add() "+ "text value is ", text)
    let result = hasDuplicate(text);
    console.log("hasDuplicate() "+result)

    if (result === true){  //  means duplicate exists, and don't add to the todolist
        // alert(`"${text}", already exists, please try some other task name!`)
        errorMessage.textContent =  `"${text}", already exists, please try some other task name!`;
        return;
    }else{
        // add text to the array
        console.log("adding todo to todoListArray")
        //text.toUppercase() use convert method
        todoListArray.push(text);
        saveInLocalStorage("todolist", todoListArray);

        console.log("todoListArray value is: ", todoListArray)
    }
}

function remove(text){

    let index = todoListArray.indexOf(text); // will give you -1 if text not found in array
    if(index > -1){
        todoListArray.splice(index, 1)
    }
    saveInLocalStorage("todolist", todoListArray);
    // a = [ash, miki, lazy]
    //  a.splice(1, 2)
    
    console.log("inside remove() after value of todoListArray now", todoListArray)
    // prev: ["ash", "miki"]
    // when you delete  ash, splice creates a new array : ["miki"]
}

function hasDuplicate(text){
    let duplicateFound = todoListArray.includes(text); // this will return true if text exists in arr
    return duplicateFound;
    // yes or no, true or false
}


function saveInLocalStorage(key, data){
    data = JSON.stringify(data); // before saving data just do this step
    localStorage.setItem(key, data);
}

// function test(){
//     return 1+1;
// }

// test() // = 2 

// function test2(text){ 
//     return text + " customer";
// }

// let result = test2("hello") // hello customer