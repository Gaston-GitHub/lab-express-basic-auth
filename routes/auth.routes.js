
const { Router} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');

const User = require('../models/User.model');

router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
    console.log('The form data: ', req.body);
    const { username, email, password } = req.body;

    bcryptjs
        .genSalt(10)
        .then(salt => {
            console.log('salt', salt)
            return bcryptjs.hash(password, salt)
        })
        .then(hashedPassword => 
            User.create({username, email, hashedPassword }))
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB)
            res.redirect('/userProfile')
        })
         .catch(error => next(error));
})

    

router.get('/userProfile', (req, res) => res.render('users/user-profile'));
    

module.exports = router;