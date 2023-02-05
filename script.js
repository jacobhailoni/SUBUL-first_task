// dark mode
const darkThemeBtn = document.getElementById("darkmode");
const body = document.querySelector("body");
const header = document.getElementById("header");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const details = document.getElementById("details");

// variable to check whether dark mode is active or not
let darkThemeActive = false;

// Add click event listener to dark mode button
darkThemeBtn.addEventListener("click", () => {
  // Toggle dark mode
  darkThemeActive = !darkThemeActive;
  if (darkThemeActive) {
    // Set background and text color to dark theme
    body.style.backgroundColor =
      input.style.backgroundColor =
      list.style.backgroundColor =
      details.style.backgroundColor =
        "hsl(235, 24%, 19%)";
    body.style.color = input.style.color = "white";
    header.style.background = "url('./images/bg-desktop-dark.jpg') no-repeat";
    darkThemeBtn.src = "./images/icon-sun.svg";
  } else {
    // Set background and text color to light theme
    body.style.backgroundColor =
      input.style.backgroundColor =
      list.style.backgroundColor =
      details.style.backgroundColor =
        "white";
    body.style.color = input.style.color = "black";
    header.style.background = "url('./images/bg-desktop-light.jpg') no-repeat";
    darkThemeBtn.src = "./images/icon-moon.svg";
  }
});

// Todo class with methods to check and delete a todo
class Todo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }

  // Method to check a todo
  checkTodo(id) {
    let todoEl = document.getElementById(id);
    let todo = todoList.find((todo) => todo.id === id);
    let check = todoEl.getElementsByClassName("border")[0];
    var isDone = todoEl.classList.contains("done");
    if (isDone) {
      // If it is done, remove the "done" class and update the count
      todo.done = !todo.done;
      todoEl.classList.remove("done");
      check.style.backgroundColor = "white";
      updateTodoCount();
    } else {
      // If it is not done, add the "done" class and update the count
      todo.done = !todo.done;
      todoEl.classList.add("done");
      check.style.backgroundColor = "hsl(280, 87%, 65%)";
      updateTodoCount();
    }
  }

  // Method to delete a todo
  deleteTodo(id) {
    // Find the todo to delete based on the given id
    let todo = todoList.find((todo) => todo.id === id);
    // Get the index of the todo in the todoList array
    let todoIndex = todoList.indexOf(todo);
    // Remove the todo from the todoList array using the splice method
    todoList.splice(todoIndex, 1);
    // Get the todo element from the HTML document using its id
    let todoElement = document.getElementById(id);
    // Remove the todo element from the HTML document using the parentNode property and removeChild method
    todoElement.parentNode.removeChild(todoElement);
    // Call the updateTodoCount method to update the number of todos displayed
    updateTodoCount();
  }
}
function renderTodos(filterList) {
  // clear the current todo-list element
  document.getElementById("todo-list").innerHTML = "";
  // loop through the todoList array
  for (let i = 0; i < filterList.length; i++) {
    // create a new div element to hold the todo item
    let todoElement = document.createElement("div");
    // set the id and class attribute of the div element
    todoElement.setAttribute("id", filterList[i].id);
    todoElement.setAttribute("class", "todo");
    // set the innerHTML of the div element
    todoElement.innerHTML = `<div class="border" onclick="element.checkTodo(${
      filterList[i].id
    })" style="${
      filterList[i].done
        ? "background-color: hsl(280, 87%, 65%)"
        : "background-color: white"
    }""><img class="image" id="check" src="./images/icon-check.svg"  alt="" ></div>
                                    <h3>${filterList[i].text}</h3>
                                    <img src="./images//icon-cross.svg" alt="" onclick="element.deleteTodo(${
                                      filterList[i].id
                                    })"></img>`;
    // if the Todo object is done, add the "done" class to the div element
    if (filterList[i].done) {
      todoElement.classList.add("done");
    }
    // add the div element to the "todo-list" element
    document.getElementById("todo-list").appendChild(todoElement);
  }
  // update the todo count
  updateTodoCount();
}
// add Todo
document
  .getElementById("todo-input")
  .addEventListener("keypress", function (e) {
    // check if the key pressed is "Enter"
    if (e.key === "Enter") {
      // get the value of the input field
      let inputValue = document.getElementById("todo-input").value;
      // check if the input value is empty
      if (inputValue.trim() == "") {
        alert("Input is empty"); // show an alert message
      } else {
        // create a new Todo object
        element = new Todo(todoList.length + 1, inputValue);
        // add the Todo object to the array
        todoList.push(element);
        // create a new div element to hold the todo item
        renderTodos(todoList);
        document.getElementById("todo-input").value = "";
      }
    }
    // update the todo count
    updateTodoCount();
  });

let todoList = []; // array to hold all the todo items

// Function to filter todos based on filter type
function filterTodos(filter) {
  let filteredTodos = [];
  // If filter type is "all", set filteredTodos to the entire todoList
  if (filter === "all") {
    filteredTodos = todoList;
    // If filter type is "active", set filteredTodos to the todos that are not done
  } else if (filter === "active") {
    filteredTodos = todoList.filter((todo) => !todo.done);
    // If filter type is "completed", set filteredTodos to the todos that are done
  } else if (filter === "completed") {
    filteredTodos = todoList.filter((todo) => todo.done);
  }
  // Render the filtered todos
  renderTodos(filteredTodos);
}

// Function to remove completed todos
function removeCompletedTodos() {
  // Filter todoList array to only contain todos with done property set to false
  todoList = todoList.filter((todo) => !todo.done);
  // Call renderTodos function and pass the filtered todoList
  renderTodos(todoList);
}

// function to update the count of todo items
function updateTodoCount() {
  // Get all the todo elements
  var todos = document.querySelectorAll(".todo");
  // Get all the done todos
  var doneTodos = document.querySelectorAll(".todo.done");
  // Get the count element
  var details = document.getElementById("details");
  // Update the count
  details.innerHTML = `<h3>${
    todos.length - doneTodos.length
  } items left</h3>
  <div style="display:flex;gap:25px"><span onclick="filterTodos('all')">All</span><span onclick="filterTodos('active')">Active</span><span onclick="filterTodos('completed')">Complete</span></div>
  <span onclick="removeCompletedTodos()">Clear Complete</span>`;
}

// Call the function when the page loads
updateTodoCount();
