const express = require('express');
const cookieParser = require('cookie-parser');// create cookie
// const router = require('./routes'); This line written by mistake thats why i am getting error while i am trying to authenticate through passport
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// This is for use layouts in pages 
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine for use ejs file in views folder
app.set('view engine','ejs');
app.set('views', './views');

app.use(session({name : 'codeial',
    // todo change the secret before deployment in product mode

    secret : 'blabla',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});