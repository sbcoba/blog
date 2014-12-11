/**
 * Created by 동준 on 2014-10-29.
 */
var config = {};

/* server port */
config.web = {};
config.web.port = process.env.WEB_PORT || 80; //post 번호

/* session 정보 */
config.session = {};
//세션 키
config.session.secret= '';
// 세션이름
config.session.name = '';

/* redis정보 */
config.redis = {};
config.redis.host = '';
config.redis.port = 6379;
config.redis.password = '';
config.redis.tll = 100000;

/* 암호화 키 */
config.crypto = {};
config.crypto.password = '';

/* Mongodb */
config.mongodb= {};
/* mongoDB 접속 url id : pw @ host:port / db_name */
config.mongodb.connectUrl = '';

/* email관련 */
config.email = {};
config.email.host = '';
config.email.port = 587;
config.email.id = '';
config.email.password = '';
config.email.form = '';
config.email.to = '';

/* 텔레그램 */
config.tg = {};
config.tg.path = '';

/* file관련 */
config.file = {};
config.file.path="";
config.file.max_size = 1048576 * 5; // 5메가

module.exports = config;