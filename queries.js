const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

console.log("Query A: All products");
const allProducts = db.prepare('SELECT * FROM products').all();
console.log(allProducts);

console.log(" Query B: Name and Price only");
const namesAndPrices = db.prepare('SELECT name, price FROM products').all();
console.log(namesAndPrices);

console.log("Query C: Product with ID 3");
const productThree = db.prepare('SELECT * FROM products WHERE id = 3').get();
console.log(productThree);

console.log("Query D: Names containing 'sheet'");
const sheets = db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all();
console.log(sheets);

console.log(" Query E: Sorted by price (Highest first)");
const sortedPrice = db.prepare('SELECT * FROM products ORDER BY price DESC').all();
console.log(sortedPrice);

console.log(" Query F: Two most expensive products ");
const topTwo = db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all();
console.log(topTwo);

console.log("Query G: Update Cement Price and Confirm");
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();
const confirmUpdate = db.prepare('SELECT * FROM products WHERE id = 1').get();
console.log("Updated Product:", confirmUpdate);