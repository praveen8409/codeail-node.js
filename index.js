const express = require('express');
const cookieParser = require('cookie-parser');// create cookie
const router = require('./routes');
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');

// This is for use layouts in pages 
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/',require('./routes'));

// set up the view engine for use ejs file in views folder
app.set('view engine','ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})