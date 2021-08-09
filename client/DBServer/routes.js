const express = require('express');
const app = express();

const DB = require('./DBModel');
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// listen to port 8888 - set for mongoDB
app.listen(8888, () => {
    console.log("server is running on port 8888")
});

app.all('*', function (req,res,next){
    res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS')
    next()
})

//search: green verifier check
app.route('/bond/verifier') //path
    .get(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }

        DB.find({verifier:false})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result);
            })
    });

//search - regulator check
app.route('/bond/regulator') //path
    .get(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }

        DB.find({regulator:false})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result);
            })
    });

//search - give for investor
app.route('/purchase') //path
    .get(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }

        DB.find({regulator:true, verifier:true})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result);
            })
    });

//bond state - for same issuer
app.route('/bond/:account')
    .get(async function (request, response) {
        DB.find({account:request.params.account})
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                response.json(err)
            })
    });

//update bond
app.route('/update/')
    .post(async function (req, response) {
        const request = JSON.parse(req.body.message);
        DB.findByIdAndUpdate(
            request._id,
            {
                $set: {
                    regulator: request.regulator,
                    verifier: request.verifier,
                    state:request.state,
                    regulatorFeedback:request.regulatorFeedback,
                    verifierFeedback:request.verifierFeedback
                }
            },
            {
                new: true
            }
        )
            .then(result => {
                response.header("Access-Control-Allow-Origin", "*")
                response.json(result)
            })
            .catch(err => {
                console.log(err)
                response.json(err)
            })
    });

//add bond
app.route('/issue')
    .post(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }
        console.log(request.body)
        const reqBody = JSON.parse(request.body.message)


        if (!reqBody.BName) {
            response.status(200).send('No bond name').end();
        }
        const newBond = new DB(reqBody)

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


module.exports = app.route;

