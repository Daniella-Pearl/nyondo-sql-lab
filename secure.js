const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// SECURE: Use the ? placeholder to safely inject the search term
function searchProductSafe(name) {
    const query = `SELECT * FROM products WHERE name LIKE ?`;
    const rows = db.prepare(query).all(`%${name}%`);
    return rows;
}

// SECURE: Use two ? placeholders for username and password
function loginSafe(username, password) {
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const row = db.prepare(query).get(username, password);
    return row;
}

// These will now ALL return [] or undefined because the input is no longer executed as code
console.log('--- Running Security Tests ---');
console.log('Test 1 (Bypass Search):', searchProductSafe("' OR 1=1--"));
console.log('Test 2 (Union Attack): ', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log('Test 3 (Admin Bypass): ', loginSafe("admin'--", 'anything'));
console.log('Test 4 (Always True):  ', loginSafe("' OR '1'='1", "' OR '1'='1"));