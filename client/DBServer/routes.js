// const express = require('express');
// const app = express();
//
// const DB = require('./DBModel');
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())
//
// app.listen(8888, () => {
//     console.log("server is running on port 8888")
// });
// // listen to port 8888 - set for mongoDB
//
//
//
// //search: green verifier check
// app.route('/bond/verifier') //path
//     .get(async function (request, response) {
//         DB.find({verifier: false})
//             .then(result => {
//                 response.header("Access-Control-Allow-Origin", "*")
//                 response.json(result);
//             })
//     });
//
// //search - regulator check
// app.route('/bond/regulator') //path
//     .get(async function (request, response) {
//         let ret = {
//             "success": true,
//             "code": 200,
//             "message": "",
//             "data": [],
//         }
//
//         DB.find({regulator: false})
//             .then(result => {
//                 response.header("Access-Control-Allow-Origin", "*")
//                 response.json(result);
//             })
//     });
//
// //search - give for investor (purchase page)
// app.route('/purchase') //path
//     .get(async function (request, response) {
//         let ret = {
//             "success": true,
//             "code": 200,
//             "message": "",
//             "data": [],
//         }
//
//         DB.find({regulator: true, verifier: true, state: true})
//             .then(result => {
//                 response.header("Access-Control-Allow-Origin", "*")
//                 response.json(result);
//             })
//     });
//
// //bond state - for same issuer (State check - first part)
// app.route('/bond/:account')
//     .get(async function (request, response) {
//         DB.find({account: request.params.account})
//             .then(result => {
//                 response.header("Access-Control-Allow-Origin", "*")
//
//                 response.json(result)
//             })
//             .catch(err => {
//                 response.json(err)
//             })
//     });
//
//
// //find total ETH paid to the issuer
// app.route('/total/:account')
//     .get(async function (request, response) {
//         DB.aggregate([
//             {$match: {account: request.params.account}},
//             {$group: {_id: "$account", totalGet: {$sum: "$totalGet"}, totalPerson: {$sum: "$totalPerson"}}}
//         ]).exec(function (err, result) {
//             response.header("Access-Control-Allow-Origin", "*")
//             response.json(result)
//             console.log(result)
//         })
//     });
//
// //update bond
// app.route('/update/')
//     .post(async function (req, response) {
//         const request = JSON.parse(req.body.message);
//         DB.findByIdAndUpdate(
//             request._id,
//             {
//                 $set: {
//                     regulator: request.regulator,
//                     verifier: request.verifier,
//                     state: request.state,
//                     regulatorFeedback: request.regulatorFeedback,
//                     verifierFeedback: request.verifierFeedback,
//                     totalGet: request.totalGet,
//                     totalPerson: request.totalPerson
//                 }
//             },
//             {
//                 new: true
//             }
//         )
//             .then(result => {
//                 response.header("Access-Control-Allow-Origin", "*")
//                 response.json(result)
//             })
//             .catch(err => {
//                 console.log(err)
//                 response.json(err)
//             })
//     });
//
// //add bond
// app.route('/issue')
//     .post(async function (request, response) {
//         console.log(request.body)
//         const reqBody = JSON.parse(request.body.message)
//
//         if (!reqBody.BName) {
//             response.status(200).send('No bond name').end();
//         }
//         const newBond = new DB(reqBody)
//
//         newBond.save(function (error) {
//             if (!error) {
//                 response.setHeader("Access-Control-Allow-Origin", "*")
//                 response.setHeader("Cache-Control", "no-cache")
//                 response.json(newBond)
//             } else {
//                 console.log(error)
//             }
//         })
//     });
//
// module.exports = app.route;
//
