const express = require('express');
const router = express.Router();

const passport = require('passport');

const userControlller = require('../controllers/users_controller');

router.get('/profile',userControlller.profile);
router.get('/sign-up',userControlller.signUp);
router.get('/sign-in',userControlller.signIn);

router.post('/create', userControlller.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
{ failureRedirect : '/users/sign-in'},
),userControlller.createSession);


module.exports = router;