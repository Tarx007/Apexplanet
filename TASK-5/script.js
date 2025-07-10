const formatRupee = price => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
}).format(price);

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 499,
    category: "Clothing",
    description: "Soft cotton fabric, perfect for everyday wear.",
    image: "assets/tshirt.jpg"
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: 1299,
    category: "Clothing",
    description: "Slim-fit jeans with classic denim style.",
    image: "assets/jeans.jpg"
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 2299,
    category: "Footwear",
    description: "Comfortable sneakers built for performance.",
    image: "assets/shoe.jpg"
  },
  {
    id: 4,
    name: "Stylish Cap",
    price: 299,
    category: "Accessories",
    description: "Perfect cap for sunny days and casual outfits.",
    image: "assets/cap.avif"
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 699,
    category: "Accessories",
    description: "Minimalist genuine leather wallet with card slots.",
    image: "assets/wallet.jpg"
  },
  {
    id: 6,
    name: "Canvas Backpack",
    price: 1499,
    category: "Accessories",
    description: "Durable backpack for work, school, or travel.",
    image: "assets/bag.webp"
  },
  {
    id: 7,
    name: "White Sports Socks",
    price: 199,
    category: "Clothing",
    description: "Breathable, ankle-high athletic socks (3 pairs).",
    image: "assets/socks.jpg"
  },
  {
    id: 8,
    name: "Premium Hoodie",
    price: 999,
    category: "Clothing",
    description: "Warm fleece-lined hoodie with adjustable drawstring.",
    image: "assets/hoodie.jpg"
  }
];

function renderProducts(list = products) {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img loading="lazy" src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${formatRupee(product.price)}</strong></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart.`);
}

function applyFilters() {
  const keyword = (document.getElementById('search')?.value || '').toLowerCase();
  const selectedCategory = document.getElementById('category-filter')?.value || '';
  const sort = document.getElementById('sort-filter')?.value;
  const minPrice = parseFloat(document.getElementById('min-price')?.value || '0');
  const maxPrice = parseFloat(document.getElementById('max-price')?.value || Infinity);

  let filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword);
    const matchCategory = selectedCategory === '' || p.category === selectedCategory;
    const matchPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchName && matchCategory && matchPrice;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  ['search', 'category-filter', 'sort-filter', 'min-price', 'max-price'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', applyFilters);
  });
  renderProducts();
});
