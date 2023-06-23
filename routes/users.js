const express = require('express');
const router = express.Router();
const userControlller = require('../controllers/users_controller');
const { use } = require('.');

router.get('/profile',userControlller.profile);

module.exports = router;