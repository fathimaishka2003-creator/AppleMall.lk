// main.js – Home page JavaScript for AppleMall.lk

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  renderFeaturedProducts();
  updateCartCount();
  initSmoothScroll();
});

// ---- Navbar scroll effect ----
function initNavbar() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ---- Render featured products (first 4) ----
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  const featured = PRODUCTS.slice(0, 4);
  featured.forEach((p, i) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-3 fade-in-up';
    col.style.animationDelay = `${i * 0.1}s`;
    col.innerHTML = buildProductCard(p);
    container.appendChild(col);
  });
}

// ---- Build product card HTML ----
function buildProductCard(p) {
  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="product-badge ${p.badge === 'Sale' ? 'sale' : ''}">${p.badge}</span>` : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x360/1a1a1a/ffffff?text=${encodeURIComponent(p.name)}'"/>
      </div>
      <div class="product-info">
        <div class="product-series">iPhone ${p.series} Series</div>
        <div class="product-name">${p.name}</div>
        <div class="product-specs">${p.storage}GB · ${p.specs.chip}</div>
        <div>
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${p.id})">
            <i class="fas fa-bag-shopping me-1"></i> Add to Cart
          </button>
          <button class="btn-view-detail" onclick="event.stopPropagation(); openProductModal(${p.id})">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ---- Smooth scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Cart count from localStorage ----
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function getCart() {
  try { return JSON.parse(localStorage.getItem('applemall_cart')) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('applemall_cart', JSON.stringify(cart));
}

// ---- Add to Cart ----
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${product.name} added to cart!`, 'success');
}

// ---- Open product modal ----
function openProductModal(productId) {
  const p = PRODUCTS.find(p => p.id === productId);
  if (!p) return;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  document.getElementById('modalBody').innerHTML = `
    <div class="row g-4">
      <div class="col-md-5">
        <img src="${p.image}" alt="${p.name}" class="modal-product-img"
             onerror="this.src='https://via.placeholder.com/300x360/1a1a1a/ffffff?text=${encodeURIComponent(p.name)}'"/>
        <div class="mt-3">
          <small style="color:var(--text-muted)">Available Colors</small><br/>
          <div class="mt-2 d-flex gap-2 flex-wrap">
            ${p.colors.map((c, i) => `
              <div class="color-swatch ${i === 0 ? 'active' : ''}" 
                   style="background:${c}" 
                   title="${p.colorNames[i]}"
                   onclick="this.parentElement.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active')); this.classList.add('active')">
              </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="modal-product-name">${p.name}</div>
        <div class="modal-product-price">${formatPrice(p.price)}
          ${p.oldPrice ? `<span class="product-price-old" style="font-size:1rem">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:20px">${p.description}</p>
        <table class="spec-table mb-4">
          <tr><td>Display</td><td>${p.specs.display}</td></tr>
          <tr><td>Chip</td><td>${p.specs.chip}</td></tr>
          <tr><td>Camera</td><td>${p.specs.camera}</td></tr>
          <tr><td>Battery</td><td>${p.specs.battery}</td></tr>
          <tr><td>Storage</td><td>${p.storage}GB</td></tr>
          <tr><td>RAM</td><td>${p.specs.ram}</td></tr>
        </table>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn-add-cart px-4 py-2" onclick="addToCart(${p.id}); bootstrap.Modal.getInstance(document.getElementById('productModal')).hide()">
            <i class="fas fa-bag-shopping me-2"></i>Add to Cart
          </button>
          <a href="cart.html" class="btn-view-detail px-4 py-2 text-decoration-none">View Cart</a>
        </div>
      </div>
    </div>`;

  new bootstrap.Modal(modal).show();
}

// ---- Toast Notification ----
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
  const toast = document.createElement('div');
  toast.className = `app-toast ${type}`;
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Newsletter ----
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail');
  if (!email) return;
  if (!email.value || !email.value.includes('@')) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  showToast('Subscribed! Thanks for joining. 🎉', 'success');
  email.value = '';
}
