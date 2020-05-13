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
app.use('/',require('./routes/authenticateUser'));
app.use('/',require('./routes/authoriseService'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`auth server running on ${PORT}`));
