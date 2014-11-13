/**
 * Created by 동준 on 2014-10-28.
 */
var config = require('./config');
var mongo = {};

mongo.mongoose = require('mongoose');
mongo.mongoose.connect(config.mongodb.connectUrl);
var Schema = mongo.mongoose.Schema;

/* 스키마 */
mongo.schema = {};

mongo.schema.board = {
    name : String,
    id : String,
    division : String,
    content : String,
    comment : [{
        name : String,
        pw : String,
        content : String
    }],
    hashTag : String,
    regDt : Date
};


module.exports = mongo;