const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// 1. Create both tables
db.exec(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'attendant'
);
`);

// 2. Prepare Insert Statements
const insertProduct = db.prepare('INSERT INTO products (name, description, price) VALUES (?, ?, ?)');
const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)');

// 3. Use Transactions to seed data
const seedDatabase = db.transaction(() => {
    // Seed Products
    const products = [
        ['Cement (bag)', 'Portland cement 50kg bag', 35000],
        ['Iron Sheet 3m','Gauge 30 roofing sheet 3m long', 110000],
        ['Paint 5L', 'Exterior wall paint white 5L', 60000],
        ['Nails 1kg', 'Common wire nails 1kg pack', 12000],
        ['Timber 2x4', 'Pine timber plank 2x4 per metre', 25000]
    ];
    for (const p of products) insertProduct.run(...p);

    // Seed Users
    const users = [
        ['admin', 'admin123', 'admin'],
        ['fatuma', 'pass456', 'attendant'],
        ['wasswa', 'pass789', 'manager']
    ];
    for (const u of users) insertUser.run(...u);
});

// Run the seed!
try {
    seedDatabase();
    console.log("Database initialized successfully.");
} catch (err) {
    console.log("Note: Data might already exist.", err.message);
}

// 4. Verification Output
console.log("\n--- Current Users ---");
console.log(db.prepare('SELECT id, username, role FROM users').all());

console.log("\n--- Current Products ---");
console.log(db.prepare('SELECT * FROM products LIMIT 3').all());