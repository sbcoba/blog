/**
 * Created by 동준 on 2014-11-14.
 */
var express = require('express');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
var validator = require('validator');

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
 * 메뉴 등록
 */
router.post('/', function(req, res){
    var menu = new Menu();
    menu.name =  validator.isNull(req.param('name'))  ? error.throw(409,'Please check name.') : req.param('name');
    menu.url = validator.isNull(req.param('url'))  ? error.throw(409,'Please check url.') : req.param('url');
    menu.rank = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');
    menu.isAdmin = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');
    menu.regDt = dateUtil.nowDateTypeDate();

    menu.save(function(err){
        if(err){
            throw err;
        }

        res.send('');
    });
});

/**
 * 메뉴 수정
 */
router.put('/:seq', function(req, res){
    var name =  validator.isNull(req.param('name'))  ? error.throw(409,'Please check name.') : req.param('name');
    var url = validator.isNull(req.param('url'))  ? error.throw(409,'Please check url.') : req.param('url');
    var rank = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');
    var isAdmin = validator.isNull(req.param('rank'))  ? error.throw(409,'Please check rank.') : req.param('rank');

    Menu.findOneAndUpdate(
        {_id: new ObjectId(req.params.seq)},
        {$set : { name : name, url : url, rank : rank, isAdmin : isAdmin }},
        function(err, data){
            if(err){
                throw err;
            }

            res.send(data);
        })
});

/**
 * 메뉴 삭제
 */
router.delete('/:seq', function(req,res){

});


module.exports = router;