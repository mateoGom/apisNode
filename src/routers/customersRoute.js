const express = require('express');
const router=new express.Router()
const connection =require('../db/db');


//Route
router.get('/', (req,res)=>{
    res.send('welcome');
  });
  
  //all customers
  router.get('/customers',  (req,res)=>
  
  {
    const sql= 'SELECT * FROM users';
    connection.query(sql,(error,results)=>{
  
      if(error)throw error;
      if (results.length>0){
        res.send(results).status(200);
      }else{
        res.send('not results').satus(404);
      }
    });
  
  });
  
  
  router.get('/customers/:id', (req,res)=>{
    const {id}=req.params;
    const sql =`SELECT * FROM users where id = ${id}`;
    connection.query(sql,(error,results)=>{
  
      if(error)throw error;
      if (results.length>0){
        res.send(results).status(200);
      }else{
        res.send('not results').status(404);
      }
    });
    
  });
  
  router.post('/add',(req,res)=>{
    const sql='INSERT INTO users set ?';
    const customerObj={
      name: req.body.name,
      email: req.body.email
    }
    try {
        connection.query(sql, customerObj,error=>{
            if(error)throw error;
            res.send(customerObj).status(201);
          })
    } catch (error) {
        res.send(error).satus(500)
    }
  });
  
  router.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    const {name,email}=req.body;
    const sql =`UPDATE users set name='${name}',email='${email}' WHERE id=${id}`;
    connection.query(sql,error=>{
      if(error)throw error;
      res.send('customer updated');
    })
  });
  
  router.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const sql=`DELETE FROM users WHERE id=${id}`;
  
    connection.query(sql, error=>{
      if(error) throw error;
      res.send('customer deleted');
    });
  });

  module.exports=router