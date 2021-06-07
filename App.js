const express = require('express');
const router = express.Router();

const URI = require('./helper.js')
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');

mongoose.connect(URI, {userNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected sucessfully - '))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(expressEjsLayout);

app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(3000);