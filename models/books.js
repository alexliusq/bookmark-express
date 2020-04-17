let db = require('./db');

db.query('SELECT * FROM bookmarker').then(msg => console.log(msg))