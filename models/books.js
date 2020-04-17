let db = require('./db');
console.log('hello');
db.query('SELECT * FROM test').then(msg => console.log(msg.rows));
