const express = require('express');
const router = express.Router();
// import home_controller to use them
const homeController = require('../controllers/home_controller');

console.log('Router is loades');

// this is create a url to access homeController in browser
router.get('/',homeController.home);

//if any users's request come with /users url then it will go to inside users.js routs. 
router.use('/users', require('./users'));

//for any further routes access from here
//router.use('/routName', require('./routFile));

module.exports = router;