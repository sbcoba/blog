/**
 * Created by 동준 on 2014-11-14.
 */
var express = require('express');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
var validator = require('validator');
/*  캐쉬 설정 */
var LRU = require("lru-cache") , options = { max: 500
        , length: function (n) { return n * 2 }
        , dispose: function (key, n) { n.close() }
        , maxAge: 1000 * 60 * 60 }
    , cache = LRU(options);

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var mongoose = mongo.mongoose;
var Menu = mongoose.model('menu', mongo.schema.menu);


var router = express.Router();

/**
 * 메뉴 가지고 오기
 * 캐쉬에 있는지 확인후 있으면 캐쉬에 있는걸로 가지고 오고
 * 아니면 디비에서 가지고 온다.
 */
router.get('/', function(req, res){

    if(validator.isNull(cache.get('menuList'))){
       Menu.find({}, null, {sort : {'rank' : 1}}, function(err,data){
           if(err){
               throw err;
           }

           cache.set('menuList', data);
           res.send(data);
       });
    }else{
        res.send(cache.get('menuList'));
    }
});

router.get('/insert', function(req, res){
    var menu = new Menu();
    menu.name = 'program1';
    menu.url = '/#/program2';
    menu.rank = 0;
    menu.regDt = dateUtil.nowDateTypeDate();
    menu.subMenu[0] = {};
    menu.subMenu[1] = {};
    menu.subMenu[0].name = 'nodejs';
    menu.subMenu[0].url = '/#/program/nodejs';
    menu.subMenu[0].rank = '2';
    menu.subMenu[1].name = 'angular1';
    menu.subMenu[1].url = '/#/program/angular1';
    menu.subMenu[1].rank = '3';

    menu.save(function(err){
        if(err){
            throw err;
        }

        res.send('');
    })
});


module.exports = router;