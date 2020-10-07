const express = require('express');
const mysql = require('mysql');

const bodyParser=require('body-parser');
const { query } = require('express');

const PORT = process.env.PORT || 3050;

const app=express();

app.use(bodyParser.json());

//mysql
const connection=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'api'  
});

//Route
app.get('/', (req,res)=>{
  res.send('welcome');
});

//all customers
app.get('/customers', (req,res)=>

{
  const sql='SELECT * FROM users';
  connection.query(sql,(error,results)=>{

    if(error)throw error;
    if (results.length>0){
      res.json(results);
    }else{
      res.send('not results');
    }
  });

});


app.get('/customers/:id', (req,res)=>{
  const {id}=req.params;
  const sql =`SELECT * FROM users where id = ${id}`;
  connection.query(sql,(error,results)=>{

    if(error)throw error;
    if (results.length>0){
      res.json(results);
    }else{
      res.send('not results');
    }
  });
  
});

app.post('/add',(req,res)=>{
  const sql='INSERT INTO users set ?';
  const customerObj={
    name: req.body.name,
    email: req.body.email
  }
  connection.query(sql, customerObj,error=>{
    if(error)throw error;
    res.send('customer created');
  })
});

app.put('/update/:id',(req,res)=>{
  const {id}=req.params;
  const {name,email}=req.body;
  const sql =`UPDATE users set name='${name}',email='${email}' WHERE id=${id}`;
  connection.query(sql,error=>{
    if(error)throw error;
    res.send('customer updated');
  })
});

app.delete('/delete/:id',(req,res)=>{
  const {id}=req.params;
  const sql=`DELETE FROM users WHERE id=${id}`;

  connection.query(sql, error=>{
    if(error) throw error;
    res.send('customer deleted');
  });
});


//check connection 
connection.connect(error=>{
    if(error)throw error;
    console.log('database server running');
});

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
