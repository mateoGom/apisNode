const mysql = require('mysql');

//mysql
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'api'  
  });

module.exports=connection;







