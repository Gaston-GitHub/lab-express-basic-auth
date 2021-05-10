
const { Router} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/User.model');
const saltRounds = 10;

router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
    console.log('The form data: ', req.body);
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, salt)
    console.log(`Password hash: ${hashedPassword}`);

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username, 
                email,
                passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB)
        })
        .catch(error => next(error));

    })
    

module.exports = router;