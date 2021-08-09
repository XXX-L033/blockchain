const mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost/test';
    //autoIncrement = require('mongoose-auto-increment');

//syncorized
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);


const db = mongoose.connection;
//autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});



module.exports = {
    mongoose: mongoose,
    //autoIncrement: autoIncrement,
}

