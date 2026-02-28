let inputField = document.querySelector("#input-box");
let addBtn = document.getElementById("btn");
let list = document.getElementById("list-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// push tasks in array
addBtn.addEventListener("click", () => {
    const value = inputField.value.trim();
    if (!value){
        alert("you must write something !"); // يمنع إضافة فاضي
    } else{
      tasks.push({ text: value, checked: false });
      inputField.value = "";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      RenderedTasks();
  }
});

// display tasks on ul
function RenderedTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.checked) li.classList.add("checked");

    li.addEventListener("click", () => {
      task.checked = !task.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      li.classList.toggle("checked");
    });
    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";

    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      RenderedTasks();
    });
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

RenderedTasks();
