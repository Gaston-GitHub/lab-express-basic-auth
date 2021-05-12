
const { Router} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');

const User = require('../models/User.model');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

router.get('/signup', (req, res) => res.render('auth/signup'));

router.get('/login', (req, res, next) => res.render('auth/login'))

router.get('/profile', checkIfUserIsLoggedIn, (req, res, next) => {
    console.log('user', req.session.currentUser);
    res.render('auth/profile', {user: req.session.currentUser});
});

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
            res.redirect('/profile')
        })
         .catch(error => next(error));
})

router.post('/login', (req, res, next) => {
    const {email, password} = req.body;

    User.findOne({ email })
    .then(dbUser => {
        if (!dbUser) {
            return res.render("auth/login", {error: "user not found"});
        }
        const { _id, email: eMail, hashedPassword } = dbUser;
        if(bcryptjs.compareSync(password, hashedPassword)) {
            req.session.currentUser = {
                _id, 
                email: eMail,
            };
            return res.redirect("/profile");
        }
        return res.render("auth/login", {error: "password incorrect"});
    })
    .catch(error => {next(error)})
})



    

    

module.exports = router;