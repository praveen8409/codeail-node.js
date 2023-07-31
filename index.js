const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');// create cookie
// const router = require('./routes'); This line written by mistake thats why i am getting error while i am trying to authenticate through passport
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
// This is for use layouts in pages 
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo'); // this is for connect mongodb for store cookies

const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

// console.log(env.asset_path);



app.use(express.static(env.asset_path));
// Make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(express.static('public/assets'));
app.use(express.static('assets'))
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine for use ejs file in views folder
app.set('view engine','ejs');
app.set('views', './views');

//mongo store is used to store the session cookies in db
app.use(
    session({
      name: 'codeial',
      secret: env.session_cookie_key, // Make sure you have the correct environment variable set for this key
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 100, // 100 minutes (change as needed)
      },
<<<<<<< HEAD
      store:  MongoStore.connect({
        // mongoUrl: 'mongodb://0.0.0.0/codeial_development', // Replace this with your actual MongoDB connection string
        mongoUrl : 'mongodb+srv://codeial:codeial@cluster0.qd2uov1.mongodb.net/test?retryWrites=true&w=majority',
=======
      store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0/codeial_development', // Replace this with your actual MongoDB connection string
>>>>>>> parent of 5b447d0b ( Mongo url changed in index.js)
        autoRemove: 'disabled',
      }),
    })
  );
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
