const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("Todo cannot be empty");
    } else {
        addTodo(inputBox.value);
        inputBox.value = "";
        saveTodo();
    }
});

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (inputBox.value === "") {
            alert("Todo cannot be empty");
        } else {
            addTodo(inputBox.value);
            inputBox.value = "";
            saveTodo();
        }
    }
});

listContainer.addEventListener("change", (e) => {
    if ((e.target.tagName === "INPUT" && e.target.type === "checkbox") || e.target.tagName === "P") {
        e.target.parentElement.classList.toggle("checked");
        saveTodo();
    }
});

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTodo();
    }
});

function addTodo(todoText) {
    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    li.appendChild(checkbox);

    var span = document.createElement("p");
    span.innerHTML = todoText;
    li.appendChild(span);

    var deleteButton = document.createElement("span");
    deleteButton.innerHTML = "\u00d7";
    li.appendChild(deleteButton);

    listContainer.appendChild(li);
}

function saveTodo() {
    localStorage.setItem("todo", listContainer.innerHTML);
}

function showTodo() {
    listContainer.innerHTML = localStorage.getItem("todo") || "";
    listContainer.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            checkbox.parentElement.classList.toggle("checked");
            saveTodo();
        });
    });
}

showTodo();
