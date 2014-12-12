#Johayo Blog
### <a href='http://johayo.com' target='_black'>Go to Blog</a>

## 설명
저의 blog는 기본 angular를 통해서 만들었으면 서버단은 nodejs로 되어 있습니다. 그리고 redis는 세션데이터 저장소로 사용되며 mongoDB가 base입니다.

그리고 좀더 나아가서 서버 자체적으로 텔레그램을 설치하여, 모든 오류 혹은 저한테 메세지를 push 할 수 있도록 개발 되어 있습니다. 물론 이메일도 되어 있고요.

아직 개발 진행중 입니다.. ^^

config.js 파일은 서버 설정 파일 및 디비 접근 정보들이 있기때문에 공개하지 않도록 하겠습니다.

## 사용 기술
* Front
	- AngularJs
	- html5
	- css3
	- bootstrap
    - moment
	- font awesome
* Back
	- nodeJs
	- redis (noSql)
	- mongoDB(nosql)
* Server
	- digitalocean 클라우드 server
	- ceontOS 7
	- nginx Web server
* other
	- telegram-cli

## AngularJs 사용 모듈
구분                |web site
--------------------|----------------------------------------------------
angular-file-upload |<a href='https://github.com/danialfarid/angular-file-upload' target='_black'>github.com/danialfarid/angular-file-upload</a>
textangular	        |<a href='http://textangular.com/' target='_black'>textangular.com/</a>
ngDialog            |<a href='https://github.com/likeastore/ngDialog' target='_black'>github.com/likeastore/ngDialog</a>
angular-strap       |<a href='http://mgcrea.github.io/angular-strap/' target='_black'>mgcrea.github.io/angular-strap/</a>

## node 모듈
이부분은 소스를 package.json을 확인해 보시기 바랍니다.

##config.js 파일 예시
```javascript
/**
 * Created by 동준 on 2014-10-29.
 */
var config = {};

/* server port */
config.web = {};
config.web.port = process.env.WEB_PORT || 80;

/* session 정보 */
config.session = {};
config.session.secret= '';
config.session.name = '';

/* redis정보 */
config.redis = {};
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = '';
config.redis.port = 6379;
config.redis.password = '';
config.redis.tll = 100000;

/* 암호화 키 */
config.crypto = {};
config.crypto.password = '';

/* Mongodb */
config.mongodb= {};
/* id : pw @ host:port / db_name */
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
config.file.path='';
config.file.max_size = 1048576 * 5; // 5메가

module.exports = config;
```

## 텔레그램 설치법
차후 업데이트 하겠습니다.
