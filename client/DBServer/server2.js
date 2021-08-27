const express = require('express');
const app = express();


const DB2 = require('./IssuerDB');
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost/test';

//syncorized
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);


const db2 = mongoose.connection;
db2.on('error', console.error.bind(console, 'connection error:'));
db2.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});


app.all('*', function (req,res,next){
    res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS')
    next()
})

app.route('/request')
    .post(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }
        console.log(request.body)
        const reqBody = JSON.parse(request.body.message)

        const newBond = new DB2(reqBody)

        newBond.save(function (error) {
            if (!error) {
                response.setHeader("Access-Control-Allow-Origin", "*")
                response.setHeader("Cache-Control", "no-cache")
                response.json(newBond)
            } else {
                console.log(error)
            }
        })
    });

//bond state - for same issuer (State Check)
app.route('/bond/:account')
    .get(async function (request, response) {
        //later add finish:false
        DB2.find({account:request.params.account, finish:false})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                response.json(err)
            })
    });

//bond state - for same issuer (State Check)
app.route('/transfer/')
    .get(async function (request, response) {
        //later add finish:false
        DB2.find({transfer:true})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                response.json(err)
            })
    });


//bond state - for same investor(bond state)
app.route('/state/:investor')
    .get(async function (request, response) {
        DB2.find({investor:request.params.investor})
            .then(result => {
                console.log(request.params.investor)
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                response.json(err)
            })
    });

app.route('/update/')
    .post(async function (req, response) {
        const request = JSON.parse(req.body.message);
        DB2.findByIdAndUpdate(
            request._id,
            {
                $set: {
                    tokenId: request.tokenId,
                    state:request.state,
                    tokenAddress:request.tokenAddress,
                    finish:request.finish,
                    instance:request.instance,
                    transfer:request.transfer,
                    investor:request.investor
                }
            },
            {
                new: true
            }
        )
            .then(result => {
                console.log(request)
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                console.log(err)
                response.json(err)
            })
    });


module.exports = {
    mongoose: mongoose,
    app2:app.listen(3001, 'localhost', () => {
        console.log("server is running on port 3001")
    })
}

