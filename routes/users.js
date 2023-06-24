const express = require('express');
const router = express.Router();
const userControlller = require('../controllers/users_controller');
const { use } = require('.');

router.get('/profile',userControlller.profile);
router.get('/sign-up',userControlller.signUp);
router.get('/sign-in',userControlller.signIn);

router.post('/create', userControlller.create);


module.exports = router;