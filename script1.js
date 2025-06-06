
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent default submit behavior

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(`Thank you, ${name}! Your message has been sent.`);
  contactForm.reset();
});

// To-Do List Functionality
const todoInput = document.getElementById("todoInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

addTaskBtn.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  addTask(taskText);
  todoInput.value = "";
  todoInput.focus();
});

function addTask(text) {
  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  taskSpan.classList.add("todo-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(li);
  });

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
}

// Optional: Press Enter to add task
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});