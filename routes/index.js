const express = require('express');
const router = express.Router();
// import home_controller to use them
const homeController = require('../controllers/home_controller');

console.log('Router is loades');

// this is create a url to access homeController in browser
router.get('/',homeController.home);

//if any users's request come with /users url then it will go to inside users.js routs. 
router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//for any further routes access from here
//router.use('/routName', require('./routFile));

router.use('/api', require('./api'));

module.exports = router;