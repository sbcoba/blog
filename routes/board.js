/**
 * Created by 동준 on 2014-11-25.
 */
var express = require('express');
var validator = require('validator');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
var checkLogin = require('../util/checkLogin');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
/* mongo Model */
var Board = mongo.model.board;
/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

/* 라우터 */
var router = express.Router();

/**
 * 게시물을 가지고 온다.
 */
router.get('/list/:division', function(req, res){
    Board.find({division: req.params.division}, function(err, data){
        if(err){
            throw err;
        }

        res.send(data);
    });
});

/**
 * 상세 게시물 가지고 온다.
 */
router.get('/:seq', function(req, res){
    Board.findOne({_id : new ObjectId(req.params.seq)}, function(err, data){
        if(err){
            throw err;
        }

        res.send(data);
    });
});

/**
 * 로그인 체크후
 * 게시물을 등록한다.
 */
router.post('/', checkLogin.check, function(req, res){
    var board = new Board();
    board.id = req.session.loginInfo._id;
    board.division = validator.isNull(req.param('division'))  ? error.throw(409,'Please check division.') : req.param('division');
    board.title = validator.isNull(req.param('title'))  ? error.throw(409,'Please check title.') : req.param('title');
    board.content = validator.isNull(req.param('content'))  ? error.throw(409,'Please check content.') : req.param('content');
    board.hashTag = req.param('hashTag');
    board.fileList = req.param('fileList');
    board.reqDt = dateUtil.nowDateTypeDate();

    board.save(function(err, data){
        if(err){
            throw err;
        }

        res.send(data);
    })
});

/**
 * 로그인 체크후
 * 게시물을 수정한다. 수정후 데이터 리턴
 */
router.put('/:seq', checkLogin.check, function(){
    var title = validator.isNull(req.param('title'))  ? error.throw(409,'Please check title.') : req.param('title');
    var content = validator.isNull(req.param('content'))  ? error.throw(409,'Please check content.') : req.param('content');
    var hashTag = validator.isNull(req.param('hashTag'))  ? error.throw(409,'Please check hashTag.') : req.param('hashTag');

    Board.findOneAndUpdate({_id: new ObjectId(req.params.seq)}, {$set: {title: title, content: content, hashTag: hashTag}, new: true}, function(err, data){
        if(err){
            throw err;
        }

        res.send(data);
    })
});

/**
 * 로그인 체크후
 * 게시물을 삭제한다.
 */
router.delete('/:seq', checkLogin.check, function(){
    Board.remove({_id: new ObjectId(req.params.seq)}, function(err){
        if(err){
            throw err;
        }

        res.send('');
    });
});


module.exports = router;