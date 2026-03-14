# AppleMall.lk – iPhone Store 🍎

**ICT 2204 / COM 2303 – Web Design Mini Project**  
**Rajarata University of Sri Lanka | Department of Computing**  
**Registration Numbers:** ICT/2023/026 & ICT/2023/030

---

## 📌 Project Overview

**AppleMall.lk** is an interactive e-commerce web application for purchasing iPhones and Apple accessories online in Sri Lanka. The platform allows users to browse iPhone models, compare specifications, add products to cart, and complete purchases with a checkout form.

---

## 🛠️ Technologies Used

- **HTML5** – Page structure and semantic markup
- **CSS3** – Custom styling with CSS variables and animations
- **Bootstrap 5** – Responsive grid, navbar, carousel, modal, accordion
- **JavaScript (Vanilla)** – Interactivity, DOM manipulation, localStorage
- **Font Awesome 6** – Icons
- **Google Fonts (Outfit)** – Typography

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section, featured products, promo, accessories, testimonials |
| Products | `products.html` | Full product listing with search & filter |
| Cart | `cart.html` | Shopping cart, order summary, checkout form |
| Contact | `contact.html` | Contact form, info cards, FAQ accordion |

---

## ⚙️ JavaScript Features Implemented

1. **Dynamic Content Updates** – Featured products and cart items are dynamically rendered from a shared data file
2. **Search & Filter** – Real-time product filtering by series, storage, price, and search keyword
3. **Form Validation** – All forms (checkout, contact) include client-side validation with visual feedback
4. **Smooth Scrolling** – Navigation links use smooth scrolling
5. **Event Handling** – Cart add/remove, quantity controls, promo codes, modal pop-ups, hover effects
6. **Custom Animations** – Floating phone animation, pulsing glow, fade-in-up reveals, rotating badge

---

## 📁 File Structure

```
AppleMall.lk/
├── index.html          # Home page
├── products.html       # Products listing page
├── cart.html           # Shopping cart page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── products-data.js  # Shared product data
│   ├── main.js           # Home page logic
│   ├── products.js       # Products page logic
│   ├── cart.js           # Cart page logic
│   └── contact.js        # Contact page logic
└── README.md
```

---

## 🚀 How to Run

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. No build tools or server required – runs as static HTML

```bash
git clone https://github.com/YOUR_USERNAME/AppleMall-lk.git
cd AppleMall-lk
# Open index.html in browser
```

---

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark Apple-inspired UI theme
- ✅ Product search and multi-filter
- ✅ Product detail modal with color swatches
- ✅ Persistent shopping cart (localStorage)
- ✅ Quantity controls in cart
- ✅ Promo code system (try: `APPLE10`, `SAVE15`, `WELCOME`)
- ✅ Checkout form with validation
- ✅ Order confirmation with ID
- ✅ Contact form with character counter
- ✅ FAQ accordion
- ✅ Toast notifications
- ✅ Image slider (carousel) for testimonials

---

## 👨‍💻 Developers

- Student 1 – ICT/2023/026 (Index: 6018)
- Student 2 – ICT/2023/030 (Index: 6022)
