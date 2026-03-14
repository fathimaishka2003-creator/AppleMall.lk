// contact.js – Contact page JavaScript for AppleMall.lk

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  updateCartCount();
  initCharCounter();
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

function updateCartCount() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ---- Character counter for message ----
function initCharCounter() {
  const msg = document.getElementById('contactMessage');
  const counter = document.getElementById('charCount');
  if (!msg || !counter) return;

  msg.addEventListener('input', function () {
    const len = this.value.length;
    counter.textContent = `${len} / 500 characters`;
    if (len > 500) {
      this.value = this.value.slice(0, 500);
      counter.style.color = 'var(--danger)';
    } else if (len > 400) {
      counter.style.color = 'var(--warning)';
    } else {
      counter.style.color = 'var(--text-muted)';
    }
  });
}

// ---- Submit contact form with validation ----
function submitContact() {
  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const subject = document.getElementById('contactSubject');
  const message = document.getElementById('contactMessage');
  const successAlert = document.getElementById('contactSuccess');

  let valid = true;

  // Name validation
  if (!name.value.trim() || name.value.trim().length < 2) {
    name.classList.add('is-invalid');
    valid = false;
  } else {
    name.classList.remove('is-invalid');
    name.classList.add('is-valid');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid');
    valid = false;
  } else {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  }

  // Subject validation
  if (!subject.value) {
    subject.classList.add('is-invalid');
    valid = false;
  } else {
    subject.classList.remove('is-invalid');
    subject.classList.add('is-valid');
  }

  // Message validation
  if (!message.value.trim() || message.value.trim().length < 10) {
    message.classList.add('is-invalid');
    valid = false;
  } else {
    message.classList.remove('is-invalid');
    message.classList.add('is-valid');
  }

  if (!valid) {
    showToast('Please fill in all required fields correctly.', 'error');
    return;
  }

  // Show success
  successAlert.classList.remove('d-none');
  successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Reset form
  setTimeout(() => {
    document.getElementById('contactForm').reset();
    document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    document.getElementById('charCount').textContent = '0 / 500 characters';
    setTimeout(() => successAlert.classList.add('d-none'), 5000);
  }, 300);

  showToast('Message sent successfully! We\'ll respond within 24 hours.', 'success');
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
  }, 3500);
}
