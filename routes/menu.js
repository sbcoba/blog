/**
 * Created by 동준 on 2014-11-14.
 */
var express = require('express');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
var validator = require('validator');
var checkLogin = require('../util/checkLogin');

/*  캐쉬 설정 */
var SimpleCache = require("simple-lru-cache");
var cache = new SimpleCache({"maxSize":1000});

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
/* mongo Model */
var Menu = mongo.model.menu;
/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

var router = express.Router();

/**
 * 메뉴 가지고 오기
 * 캐쉬에 있는지 확인후 있으면 캐쉬에 있는걸로 가지고 오고
 * 아니면 디비에서 가지고 온다.
 */
router.get('/', function(req, res){
    var menuList = cache.get('menuList');
    if(validator.isNull(menuList)){
       Menu.find({}, null, {sort : {'rank' : 1}}, function(err,data){
           if(err){
               throw err;
           }

           cache.set('menuList', data);
           res.send(data);
       });
    }else{
        res.send(menuList);
    }
});

/**
 * 1step 메뉴 등록
 */
router.post('/', checkLogin.check, function(req, res){
    var menu = new Menu();
    menu.name =  validator.isNull(req.param('name'))  ? error.throw(409,'Please check name.') : req.param('name');
    menu.url = validator.isNull(req.param('url'))  ? error.throw(409,'Please check url.') : req.param('url');
    menu.rank = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');
    menu.regDt = dateUtil.nowDateTypeDate();

    menu.save(function(err){
        if(err){
            throw err;
        }

        cache.del("menuList");
        res.send('');
    });
});

/**
 * 2step 메뉴 등록
 */
router.post('/sub', checkLogin.check, function(req, res){
    var oneStep_id = validator.isNull(req.param('oneStep_id'))  ? error.throw(409,'Please check rank.') : req.param('oneStep_id');
    var name =  validator.isNull(req.param('name'))  ? error.throw(409,'Please check name.') : req.param('name');
    var url = validator.isNull(req.param('url'))  ? error.throw(409,'Please check url.') : req.param('url');
    var rank = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');

    Menu.update(
        {_id: new ObjectId(oneStep_id)},
        {$push : {subMenuList: {name : name, url : url, rank : rank}}},
        function(err){
            if(err){
                throw err;
            }

            cache.del("menuList");
            res.send('');
        })
});

/**
 * 메뉴 수정
 */
router.put('/:seq', function(req, res){

});

/**
 * 메뉴 삭제
 */
router.delete('/:seq', function(req,res){

});


module.exports = router;