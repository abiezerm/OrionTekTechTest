const { Router } = require('express');
const express = require('express');
const User = require('../models/user.js');
const router = express.Router();
const passport = require('passport');

//const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
    res.render('login'); 
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/users/login',
        failureFlash : true,
        })(req,res,next);
})

router.post('/register', (req, res) => {
    const { name, username, email, password, passwordConfirmation } = req.body;
    let errors = [];
    if (!name || !email || !username || !password || !passwordConfirmation) {
        errors.push({ msg: "Por favor, llene todos los campos" });
    }

    if (password !== passwordConfirmation) {
        errors.push({msg : "Las contraseñas no son iguales!"})
    }

    if (password.length < 6) {
        errors.push({ msg: "La contraseña necesita por lo menos 6 caracteres!" });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            username: username,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        })
    }
    else {
        
        User.findOne({
            $or: [
                { email: email },
                {username: username}
        ]}).exec((err, user) => {
            console.log(user);
            try {
                if (user.email = email) {
                    errors.push({ msg: "Este correo ya se encuentra registrado!" })
                    //return res.status(400).json(errors)
                }
                else {
                    errors.push({ msg: "Este nombre de usuario ya se encuentra registrado!" })
                    //return res.status(400).json(errors)
                }
            }
            catch (e) {
                console.log(e);
                const newUser = new User({
                    name: name,
                    username: username,
                    email: email,
                    password: password
                });
                newUser.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','Te has registrado satisfactoriamente!')
                    res.redirect('/users/login');
                    })
                    .catch(value => console.log(value));
                
                /*
                bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(newUser.password,salt,
                    (err,hash)=> {
                        if(err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                        //save user
                        newUser.save()
                        .then((value)=>{
                            console.log(value)
                        res.redirect('/users/login');
                        })
                        .catch(value=> console.log(value));
                    }))*/
                    
                    //bcrypt esta dando problemas de instalacion, esta parte sera omitida por ahora
            }
        })
    }
    
})

router.post('/logout', (req, res) => {
    
})

module.exports = router;