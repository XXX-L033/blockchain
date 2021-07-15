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
    description:String
});



//id-incresement
//DBModel.plugin(db.autoIncrement.plugin, {model:})
module.exports = mongoose.model('database',DBModel)
