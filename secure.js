const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

function searchProductSafe(name) {
    // VALIDATION: String check, length >= 2, and illegal characters < > ;
    if (typeof name !== 'string' || name.length < 2 || /[<>;]/.test(name)) {
        console.log(`REJECTED: Invalid search term "${name}"`);
        return [];
    }

    const query = `SELECT * FROM products WHERE name LIKE ?`;
    return db.prepare(query).all(`%${name}%`);
}

function loginSafe(username, password) {
    // VALIDATION: No spaces, not empty, password >= 6 chars
    if (!username || typeof username !== 'string' || username.includes(' ')) {
        console.log(`REJECTED: Invalid username format "${username}"`);
        return undefined;
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        console.log(`REJECTED: Password too short`);
        return undefined;
    }

    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    return db.prepare(query).get(username, password);
}

// --- TEST CASES ---
console.log('--- TESTING VALIDATION ---');

console.log('Test A:', searchProductSafe('cement'));       // Expected: Works
console.log('Test B:', searchProductSafe(''));             // Expected: Rejected (too short)
console.log('Test C:', searchProductSafe('<script>'));     // Expected: Rejected (illegal chars)

console.log('Test D:', loginSafe('admin', 'admin123'));    // Expected: Works
console.log('Test E:', loginSafe('admin', 'ab'));          // Expected: Rejected (too short)
console.log('Test F:', loginSafe('ad min', 'pass123'));    // Expected: Rejected (space)