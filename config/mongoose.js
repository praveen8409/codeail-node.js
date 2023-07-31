const mongoose = require('mongoose');
const env = require('./environment');


// mongoose.connect(`mongodb://0.0.0.0/${env.db}`);
mongoose.connect('mongodb+srv://codeial:codeial@cluster0.qd2uov1.mongodb.net/test?retryWrites=true&w=majority');

// mongoose.connect(`mongodb://0.0.0.0/${env.db}`);


// mongoose.connect(`mongodb://0.0.0.0/${env.db}`);

// mongoose.connect('mongodb://0.0.0.0/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function(){
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;
