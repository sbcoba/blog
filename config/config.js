/**
 * Created by 동준 on 2014-10-29.
 */
var config = {};

/* server port */
config.web = {};
config.web.port = process.env.WEB_PORT || 80;

/* session 정보 */
config.session = {};
config.session.secret= 'johayoBlog';
config.session.name = 'johayoBlog';

/* redis정보 */
config.redis = {};
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'johayo.com';
config.redis.port = 6379;
config.redis.password = 'johayoRedisSession0814';
config.redis.tll = 100000;

/* 암호화 키 */
config.crypto = {};
config.crypto.password = 'johayoBlogDongJun';

/* Mongodb */
config.mongodb= {};
/* id : pw @ host:port / db_name */
config.mongodb.connectUrl = 'mongodb://admin:qhdks12@johayo.com:27017/johayo_blog';

/* email관련 */
config.email = {};
config.email.host = 'smtp.naver.com';
config.email.port = 587;
config.email.id = 'mayajuni';
config.email.password = 'ehdwns3';
config.email.form = 'DongJun Kwon <mayajuni@naver.com>';
config.email.to = 'mayajuni@naver.com';

/* 텔레그램 */
config.tg = {};
config.tg.path = '/telegram/tg/';

/* file관련 */
config.file = {};
config.file.path="/johayo/upload/blog";
config.file.max_size = 1048576 * 5; // 5메가

module.exports = config;