const express = require('express');
const router = express.Router();
// import home_controller to use them
const homeController = require('../controllers/home_controller');

console.log('Router is loades');

// this is create a url to access homeController in browser
router.get('/',homeController.home);

module.exports = router;