const connection=require('./src/db/db');
const customerRoute = require('./src/routers/customersRoute');

const express = require('express');

const bodyParser=require('body-parser');
const { query } = require('express');

const PORT = process.env.PORT || 3050;

const app=express();

app.use(bodyParser.json());
app.use(customerRoute);



//check connection 
connection.connect(error=>{
    if(error)throw error;
    console.log('database server running');
});

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
