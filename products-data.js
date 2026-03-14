// products-data.js – Shared product data for AppleMall.lk

const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    series: "16",
    storage: "256",
    price: 429900,
    oldPrice: null,
    badge: "New",
    color: "#8e8e93",
    colors: ["#8e8e93", "#2c2c2e", "#d4af8a", "#e8e0d5"],
    colorNames: ["Natural Titanium", "Black Titanium", "Desert Titanium", "White Titanium"],
    specs: { display: "6.9\" Super Retina XDR", chip: "A18 Pro", camera: "48MP ProRAW system", battery: "Up to 33 hours", ram: "8GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "The ultimate iPhone. Featuring the A18 Pro chip, ProRAW camera system, and stunning Titanium design."
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    series: "16",
    storage: "128",
    price: 369900,
    oldPrice: null,
    badge: "New",
    color: "#2c2c2e",
    colors: ["#8e8e93", "#2c2c2e", "#d4af8a", "#e8e0d5"],
    colorNames: ["Natural Titanium", "Black Titanium", "Desert Titanium", "White Titanium"],
    specs: { display: "6.3\" Super Retina XDR", chip: "A18 Pro", camera: "48MP ProRAW system", battery: "Up to 27 hours", ram: "8GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "Pro performance in a sleek form. The iPhone 16 Pro brings professional-grade tools to your pocket."
  },
  {
    id: 3,
    name: "iPhone 16",
    series: "16",
    storage: "128",
    price: 279900,
    oldPrice: 299900,
    badge: "Sale",
    color: "#007aff",
    colors: ["#007aff", "#f5f5f0", "#e8c4b8", "#2c2c2e", "#1d3461"],
    colorNames: ["Ultramarine", "White", "Pink", "Black", "Teal"],
    specs: { display: "6.1\" Super Retina XDR", chip: "A18", camera: "48MP Fusion camera", battery: "Up to 22 hours", ram: "8GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "A big leap for iPhone. The iPhone 16 features the powerful A18 chip and an all-new Camera Control."
  },
  {
    id: 4,
    name: "iPhone 16 Plus",
    series: "16",
    storage: "256",
    price: 309900,
    oldPrice: null,
    badge: "New",
    color: "#e8c4b8",
    colors: ["#007aff", "#f5f5f0", "#e8c4b8", "#2c2c2e"],
    colorNames: ["Ultramarine", "White", "Pink", "Black"],
    specs: { display: "6.7\" Super Retina XDR", chip: "A18", camera: "48MP Fusion camera", battery: "Up to 27 hours", ram: "8GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "Big screen. Big battery. A18 chip. The iPhone 16 Plus is the perfect balance of size and power."
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max",
    series: "15",
    storage: "256",
    price: 359900,
    oldPrice: 399900,
    badge: "Sale",
    color: "#8e8e93",
    colors: ["#8e8e93", "#2c2c2e", "#d4af8a", "#f5ebe0"],
    colorNames: ["Natural Titanium", "Black Titanium", "Blue Titanium", "White Titanium"],
    specs: { display: "6.7\" Super Retina XDR", chip: "A17 Pro", camera: "48MP ProRAW system", battery: "Up to 29 hours", ram: "8GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "The previous-generation Pro Max — still an incredible phone at a reduced price."
  },
  {
    id: 6,
    name: "iPhone 15",
    series: "15",
    storage: "128",
    price: 189900,
    oldPrice: 229900,
    badge: "Sale",
    color: "#f5ebe0",
    colors: ["#f5ebe0", "#2c2c2e", "#e8d5b7", "#006450", "#4a90d9"],
    colorNames: ["Yellow", "Black", "Pink", "Green", "Blue"],
    specs: { display: "6.1\" Super Retina XDR", chip: "A16 Bionic", camera: "48MP main camera", battery: "Up to 20 hours", ram: "6GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "The iPhone 15 features a gorgeous design with Dynamic Island and the versatile 48MP camera."
  },
  {
    id: 7,
    name: "iPhone 14 Pro",
    series: "14",
    storage: "128",
    price: 269900,
    oldPrice: 329900,
    badge: "Sale",
    color: "#5c3317",
    colors: ["#5c3317", "#2c2c2e", "#e8d5b7", "#8e97ad"],
    colorNames: ["Deep Purple", "Space Black", "Gold", "Silver"],
    specs: { display: "6.1\" Super Retina XDR", chip: "A16 Bionic", camera: "48MP Pro camera", battery: "Up to 23 hours", ram: "6GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "The Pro-grade iPhone 14 Pro with Dynamic Island and 48MP camera at a great value."
  },
  {
    id: 8,
    name: "iPhone 13",
    series: "13",
    storage: "128",
    price: 149900,
    oldPrice: 189900,
    badge: "Sale",
    color: "#394f6b",
    colors: ["#394f6b", "#2c2c2e", "#c5dfd4", "#e8c4b8", "#f5f5f0"],
    colorNames: ["Blue", "Midnight", "Green", "Pink", "Starlight"],
    specs: { display: "6.1\" Super Retina XDR", chip: "A15 Bionic", camera: "12MP dual camera", battery: "Up to 19 hours", ram: "4GB" },
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=800&hei=900&fmt=p-jpg&qlt=80",
    description: "The iPhone 13 remains a stellar choice with A15 Bionic and beautiful OLED display."
  }
];

// Helper: format price to LKR
function formatPrice(price) {
  return 'LKR ' + price.toLocaleString('en-LK');
}
