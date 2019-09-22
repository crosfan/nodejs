var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    user: 'nodejs',
    password: '##########',
    server: 'localhost',
    database: 'JSON_WS'
}

app.get('/', function (req, res) {
	res.end('Nothing to see here, move along...');
});

app.get('/cb_divisions', function (req, res) {

	new sql.ConnectionPool(sqlConfig).connect().then(pool => {
	  return pool.request().query("select * from dbo.states order by StateAbbreviation")
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

// Start server and listen on http://localhost:8091/
var server = app.listen(8091, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
