let connection = mysql.createConnection({
	host: '10.1.36.241'
	user: 'userr'
	password: '12345'
	database: 'epd'
})

connection.connect(function(err){
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  console.log('Connected to the MySQL server.');
});


connection.query('SELECT * FROM `aqi`', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});