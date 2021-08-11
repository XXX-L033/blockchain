const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    maturityDate:Date,
    transfer:Boolean,
    type:String,
    name:String,
    url:String,
    finish:Boolean,
});

module.exports = mongoose.model('buyer',IssuerDB)
