-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-Role many-to-many relationship
CREATE TABLE user_roles (
    user_id INT REFERENCES users(id),
    role_id INT REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id),
    qr_code TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) UNIQUE,
    quantity INT DEFAULT 0,
    min_threshold INT DEFAULT 10,
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders table
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    supplier_id INT REFERENCES suppliers(id),
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, ORDERED, RECEIVED, CANCELLED
    total_amount DECIMAL(15, 2) DEFAULT 0,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expected_delivery_date TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Purchase Order Items table
CREATE TABLE purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INT REFERENCES purchase_orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50), -- LOW_STOCK, ORDER_DELAYED, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock History table
CREATE TABLE stock_history (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    change_quantity INT NOT NULL,
    type VARCHAR(50), -- ADDED, REMOVED, SOLD
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Records table
CREATE TABLE sales_records (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    entity_name VARCHAR(100),
    entity_id INT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Roles
INSERT INTO roles (name) VALUES 
('ROLE_STORE_MANAGER'), 
('ROLE_WAREHOUSE'), 
('ROLE_SUPPLIER'), 
('ROLE_FINANCE_ADMIN');

