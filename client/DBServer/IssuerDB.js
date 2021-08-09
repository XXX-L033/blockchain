const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

const db2 = require('./server2');

const IssuerDB = new Schema({
    account: String,
    BName: String,
    tokenAddress:String,
    investor:String,
    faceValue:Number,
    state:Boolean,
    interestRate:Number,
    tokenId:Number,
    startDate:Date,
    maturityDate:Date
});

module.exports = mongoose.model('buyer',IssuerDB)
