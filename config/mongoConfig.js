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

/* 사용자 */
mongo.schema.member = new Schema({
    _id : String,
    password : String,
    name : String,
    regDt : Date
});

/* 게시판 */
mongo.schema.board = new Schema({
    id : String,
    division : String,
    title : String,
    content : String,
    commentList : [],
    file : [],
    hashTag : String,
    regDt : Date
});

mongo.schema.autoSeq = new Schema({
    _id: String,
    seq : Number
});

/* 메뉴 */
mongo.schema.menu = new Schema({
    name : String,
    url : String,
    /* 정렬 순서 */
    rank : Number,
    subMenuList : [],
    regDt : String
});

/* 달력 */
mongo.schema.calendar = new Schema({
    year : Number,
    month : Number,
    day : Number,
    week : String,
    holiday : String,
    weekend : String,
    notWork : String,
    objectives : [{
        id : String,
        isAnction : String,
        memo : String,
        actionDt : Date,
        regDt : Date
    }]
});

/* 모델 */
mongo.model = {};
mongo.model.member =  mongo.mongoose.model('member', mongo.schema.member);
mongo.model.menu =  mongo.mongoose.model('menu', mongo.schema.menu);
mongo.model.board =  mongo.mongoose.model('board', mongo.schema.board);
mongo.model.autoSeq =  mongo.mongoose.model('autoSeq', mongo.schema.autoSeq);


module.exports = mongo;