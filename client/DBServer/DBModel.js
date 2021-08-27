const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

const db = require('./server');

const DBModel = new Schema({
    BName:{
        type:String,
    },
    name:{
        type:String,
    },
    type:String,
    income:Number,
    BSymbol:String,
    coupon:Number,
    account:String,
    startDate:Date,
    maturityDate:Date,
    faceValue:Array,
    url:String,
    description:String,
    regulator:Boolean,
    verifier:Boolean,
    regulatorFeedback:String,
    verifierFeedback:String,
    tokenAddress:String,
    state:Boolean,
    totalGet:Number,
    totalPerson:Number,
});

module.exports = mongoose.model('bond',DBModel)
