const mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost/test';
//autoIncrement = require('mongoose-auto-increment');

//syncorized
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);


const db2 = mongoose.connection;
db2.on('error', console.error.bind(console, 'connection error:'));
db2.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});


module.exports = {
    mongoose: mongoose,
}

