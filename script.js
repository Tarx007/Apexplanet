// To-Do List / Note-Taking App with Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(${i})">Delete</button>`;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (taskInput && taskInput.value.trim()) {
    tasks.push(taskInput.value.trim());
    taskInput.value = "";
    renderTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

if (addTaskBtn && taskInput) {
  addTaskBtn.onclick = addTask;
  taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
  });
}
renderTasks();

// Product Listing with Filtering and Sorting
const productData = [
  { name: "Smartphone", category: "tech", price: 499, rating: 4.5 },
  { name: "Sneakers", category: "fashion", price: 199, rating: 4.2 },
  { name: "Laptop", category: "tech", price: 999, rating: 4.8 },
  { name: "Jeans", category: "fashion", price: 79, rating: 4.1 },
  { name: "Headphones", category: "tech", price: 149, rating: 4.3 },
  { name: "Jacket", category: "fashion", price: 249, rating: 4.6 }
];
const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");

function renderProducts(data) {
  if (!productContainer) return;
  productContainer.innerHTML = "";
  data.forEach(p => {
    productContainer.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Category: ${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
        <p>Price: ₹${p.price}</p>
        <p>Rating: ⭐${p.rating}</p>
      </div>`;
  });
}

function applyFilters() {
  let filtered = [...productData];
  if (categoryFilter && categoryFilter.value !== "all") {
    filtered = filtered.filter(p => p.category === categoryFilter.value);
  }
  if (sortBy) {
    if (sortBy.value === "priceLow") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === "ratingHigh") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
  }
  renderProducts(filtered);
}
if (categoryFilter && sortBy) {
  categoryFilter.onchange = applyFilters;
  sortBy.onchange = applyFilters;
}
renderProducts(productData);

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after click
      document.querySelector('.nav-links').classList.remove('active');
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
});
