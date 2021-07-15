const express = require('express');
const app = express();

const DB = require('./DBModel');
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// listen to port 8888 - set for mongoDB
app.listen(8888, () => {
    console.log("server is running on port 8888")
});

//search
app.route('/bond') //path
    .get(async function (request, response) {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }
        console.log("aaa")
        DB.find({})
            .then(result =>{
                response.header("Access-Control-Allow-Origin", "*")
                console.log("bbb");
                console.log(result)
                response.json(result);
            })

        // ret.data = datas
        //
        // //response.setHeader("Cache-Control", "no-cache")
        // response.send(ret)

    });

app.route('/issue')
    .post(async function (request, response)  {
        let ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": [],
        }
        console.log(request.body)
        const reqBody = JSON.parse(request.body.message)


        if(reqBody.BName){
            response.status(200).send('No bond name').end();
        }
        const newBond = new DB(reqBody)

        newBond.save(function (error){
            if(!error){
                response.setHeader("Access-Control-Allow-Origin", "*")
                response.setHeader("Cache-Control", "no-cache")
                response.json(newBond)
            }else{
                console.log(error)
            }
        })
    });

module.exports = app.route;

