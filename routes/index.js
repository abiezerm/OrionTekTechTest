const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/home', (req, res) => {
    res.render('home')
})
module.exports = router;