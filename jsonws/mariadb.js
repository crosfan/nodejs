var express = require('express'); // Web Framework
var app = express();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'myUser', 
     password: 'myPassword',
     connectionLimit: 5
});


app.get('/', function (req, res) {
	res.end('Nothing to see here, move along...');
});




app.get('/states', function (req, res) {

  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).json(rows);

  } catch (err) {
	res.status(500).send({ message: "${err}"})
	throw err;
  } finally {
	if (conn) return conn.end();
  }
});


// Start server and listen on http://localhost:8080/
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
