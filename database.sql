-- ============================================
-- AppleMall.lk Database
-- Phase 03 - DB Integration
-- ICT 2204 Web Technologies
-- ICT/2023/026 & ICT/2023/030
-- ============================================

CREATE DATABASE IF NOT EXISTS applemall_db;
USE applemall_db;

-- ---- Users Table ----
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Products Table ----
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    series VARCHAR(10) NOT NULL,
    storage VARCHAR(10) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    badge VARCHAR(20),
    description TEXT,
    image_url VARCHAR(500),
    stock INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Orders Table ----
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Order Items Table ----
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- ---- Contact Messages Table ----
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Insert Sample Products ----
INSERT INTO products (name, series, storage, price, old_price, badge, description, image_url) VALUES
('iPhone 16 Pro Max', '16', '256GB', 429900.00, NULL, 'New', 'The ultimate iPhone with A18 Pro chip and ProRAW camera.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 16 Pro', '16', '128GB', 369900.00, NULL, 'New', 'Pro performance with A18 Pro chip and titanium design.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 16', '16', '128GB', 279900.00, 299900.00, 'Sale', 'A18 chip with Camera Control and Action Button.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 16 Plus', '16', '256GB', 309900.00, NULL, 'New', 'Big screen with A18 chip and long battery life.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 15 Pro Max', '15', '256GB', 359900.00, 399900.00, 'Sale', 'Previous gen Pro Max with A17 Pro chip.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 15', '15', '128GB', 189900.00, 229900.00, 'Sale', 'Dynamic Island and 48MP camera at a great price.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 14 Pro', '14', '128GB', 269900.00, 329900.00, 'Sale', 'Dynamic Island with 48MP Pro camera system.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=800&hei=900&fmt=p-jpg&qlt=80'),
('iPhone 13', '13', '128GB', 149900.00, 189900.00, 'Sale', 'A15 Bionic chip with beautiful OLED display.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-blue?wid=800&hei=900&fmt=p-jpg&qlt=80');
