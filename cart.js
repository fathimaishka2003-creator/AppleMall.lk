// cart.js – Cart page JavaScript for AppleMall.lk

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  renderCart();
  updateCartCount();
});

function initNavbar() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function getCart() {
  try { return JSON.parse(localStorage.getItem('applemall_cart')) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('applemall_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

let appliedDiscount = 0;

// ---- Render cart ----
function renderCart() {
  const cart = getCart();
  const emptyEl = document.getElementById('emptyCart');
  const contentEl = document.getElementById('cartContent');
  const listEl = document.getElementById('cartItemsList');

  if (cart.length === 0) {
    emptyEl.classList.remove('d-none');
    contentEl.classList.add('d-none');
    return;
  }

  emptyEl.classList.add('d-none');
  contentEl.classList.remove('d-none');
  listEl.innerHTML = '';

  cart.forEach(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return;

    const el = document.createElement('div');
    el.className = 'cart-item fade-in-up';
    el.id = `cart-item-${p.id}`;
    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="cart-item-img"
           onerror="this.src='https://via.placeholder.com/90x90/1a1a1a/fff?text=iPhone'"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-specs">${p.storage}GB · ${p.specs.chip}</div>
        <div class="cart-item-price">${formatPrice(p.price)}</div>
      </div>
      <div class="d-flex flex-column align-items-end gap-2">
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fas fa-minus" style="font-size:0.7rem"></i></button>
          <span class="qty-num" id="qty-${p.id}">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id}, 1)"><i class="fas fa-plus" style="font-size:0.7rem"></i></button>
        </div>
        <div style="font-size:0.9rem; color:var(--text-secondary); font-weight:600">${formatPrice(p.price * item.qty)}</div>
        <button class="btn-remove" onclick="removeItem(${p.id})" title="Remove">
          <i class="fas fa-trash-can"></i>
        </button>
      </div>`;
    listEl.appendChild(el);
  });

  updateSummary();
}

// ---- Change quantity ----
function changeQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart(cart);
  renderCart();
}

// ---- Remove item ----
function removeItem(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCart();
  showToast('Item removed from cart.', 'error');
}

// ---- Update order summary ----
function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const discount = Math.round(subtotal * appliedDiscount);
  const total = subtotal - discount;

  document.getElementById('subtotalAmount').textContent = formatPrice(subtotal);
  document.getElementById('discountAmount').textContent = discount > 0 ? `— ${formatPrice(discount)}` : '— LKR 0';
  document.getElementById('totalAmount').textContent = formatPrice(total);
}

// ---- Apply promo code ----
function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  const msgEl = document.getElementById('promoMessage');

  const promoCodes = {
    'APPLE10': 0.10,
    'SAVE15': 0.15,
    'WELCOME': 0.05
  };

  if (promoCodes[code]) {
    appliedDiscount = promoCodes[code];
    msgEl.innerHTML = `<span style="color:var(--success); font-size:0.85rem"><i class="fas fa-check me-1"></i>${Math.round(appliedDiscount * 100)}% discount applied!</span>`;
    updateSummary();
    showToast(`Promo code applied! ${Math.round(appliedDiscount * 100)}% off`, 'success');
  } else {
    appliedDiscount = 0;
    msgEl.innerHTML = `<span style="color:var(--danger); font-size:0.85rem"><i class="fas fa-xmark me-1"></i>Invalid promo code.</span>`;
    updateSummary();
  }
}

// ---- Proceed to checkout ----
function proceedCheckout() {
  new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}

// ---- Place order with form validation ----
function placeOrder() {
  const form = document.getElementById('checkoutForm');
  const name = document.getElementById('checkoutName');
  const phone = document.getElementById('checkoutPhone');
  const email = document.getElementById('checkoutEmail');
  const address = document.getElementById('checkoutAddress');
  const city = document.getElementById('checkoutCity');

  let valid = true;

  // Validate each field
  [name, address, city].forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      valid = false;
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid');
    valid = false;
  } else {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  }

  // Phone validation (Sri Lanka format)
  const phoneRegex = /^0[0-9]{9}$/;
  if (!phoneRegex.test(phone.value.trim().replace(/\s/g, ''))) {
    phone.classList.add('is-invalid');
    valid = false;
  } else {
    phone.classList.remove('is-invalid');
    phone.classList.add('is-valid');
  }

  if (!valid) {
    showToast('Please fill in all required fields correctly.', 'error');
    return;
  }

  // Generate order ID
  const orderId = 'AM-' + Date.now().toString().slice(-8);
  document.getElementById('orderIdDisplay').textContent = orderId;

  // Clear cart
  localStorage.removeItem('applemall_cart');
  updateCartCount();

  // Close checkout modal, show success
  bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
  setTimeout(() => {
    new bootstrap.Modal(document.getElementById('successModal')).show();
  }, 400);
}

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
    toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
