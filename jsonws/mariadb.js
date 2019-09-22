var express = require('express'); // Web Framework
var app = express();
var sql = require('mariadb'); // Maria DB client

// Connection string parameters.
var sqlConfig = {
    user: 'nodews',
    password: '##########',
    server: 'localhost',
    database: 'webservice'
}

app.get('/', function (req, res) {
	res.end('Nothing to see here, move along...');
});

app.get('/cb_divisions', function (req, res) {

	new sql.ConnectionPool(sqlConfig).connect().then(pool => {
	  return pool.request().query("select StateAbbreviation, StateName from states order by StateAbbreviation;")
	  }).then(result => {
		let rows = result.recordset
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.status(200).json(rows);
		sql.close();
	  }).catch(err => {
		res.status(500).send({ message: "${err}"})
		sql.close();
	  });

})

// Start server and listen on http://localhost:8080/
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
