#Johayo Blog
## 접근
'''html
	http://johayo.com
'''

## 설명
저의 blog는 기본 angular를 통해서 만들었으면 서버단은 nodejs로 되어 있습니다. 그리고 redis는 세션데이터 저장소로 사용되며 mongoDB가 base입니다.

그리고 좀더 나아가서 서버 자체적으로 텔레그램을 설치하여, 모든 오류 혹은 저한테 메세지를 push 할 수 있도록 개발 되어 있습니다. 물론 이메일도 되어 있고요.

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
angular-file-upload | https://github.com/danialfarid/angular-file-upload
--------------------|----------------------------------------------------
textangular	        |http://textangular.com/
--------------------|----------------------------------------------------
ngDialog            |https://github.com/likeastore/ngDialog
--------------------|----------------------------------------------------
angular-strap       |http://mgcrea.github.io/angular-strap/
--------------------|----------------------------------------------------

## node 모듈
이부분은 소스를 package.json을 확인해 보시기 바랍니다.

## 텔레그램 설치법
차후 업데이트 하겠습니다.
