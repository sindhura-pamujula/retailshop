const express = require('express');

const path = require('path');
const db = require('./config/database');
const bodyParser = require('body-parser');

const app = express();


//testing connection
db.authenticate()
.then(()=> console.log('Connection has been established successfully.'))
.catch (()=>console.error('Unable to connect to the database:', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/api',require('./routes/api/products'));


const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server running on ${PORT}`));

