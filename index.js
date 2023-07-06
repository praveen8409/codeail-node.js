const express = require('express');
const cookieParser = require('cookie-parser');// create cookie
// const router = require('./routes'); This line written by mistake thats why i am getting error while i am trying to authenticate through passport
const app = express();
const port = 8000;
// This is for use layouts in pages 
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo'); // this is for connect mongodb for store cookies
const flash = require('connect-flash');
const customMware = require('./config/middleware');



app.use(express.static('./assets'));
// Make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine for use ejs file in views folder
app.set('view engine','ejs');
app.set('views', './views');

//mongo store is used to store the session cookies in db
app.use(session({name : 'codeial',
    // todo change the secret before deployment in product mode
    
    secret : 'blabla',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'
    }),
    function(err){
        console.log(err||'connect-mongo-db');
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});