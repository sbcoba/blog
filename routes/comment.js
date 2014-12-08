/**
 * Created by 동준 on 2014-11-25.
 */
var express = require('express');
var validator = require('validator');
var error = require('../util/error');
var cryptoUtil = require('../util/cryptoUtil');
var config = require('../config/config');

var dateUtil = require('../util/dateUtil');
var checkLogin = require('../util/checkLogin');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
/* mongo Model */
var Board = mongo.model.board;
var AutoSeq = mongo.model.autoSeq;
/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;
/* 라우터 */
var router = express.Router();

/**
 * 로그인 체크후
 * autoSeq에서 seq를 가지고 온 후
 * 댓글을 등록 후 데이터 리턴
 */
router.post('/', checkLogin.check, function(req, res){
    if(!!req.session.loginInfo){
        var id = req.session.loginInfo._id;
        var pw = req.session.loginInfo.password;
    }else{
        var id = validator.isNull(req.param('id'))  ? error.throw(409,'Please check id.') : req.param('id');
        var pw = validator.isNull(req.param('pw'))  ? error.throw(409,'Please check password.') : cryptoUtil.encrypt(req.param('pw'), config.crypto.password);
    }
    var boardSeq = validator.isNull(req.param('boardSeq'))  ? error.throw(409,'Please check boardSeq.') : req.param('boardSeq');
    var content = validator.isNull(req.param('content'))  ? error.throw(409,'Please check content.') : req.param('content');

    AutoSeq.findOneAndUpdate({_id : 'comment'}, {$inc : {seq: 1}, new: true}, function(err, result){
        if(err){
            throw err;
        }

        var seq = result.seq;

        Board.findOneAndUpdate(
            {_id: new ObjectId(boardSeq)},
            {
                $push: {commentList : {seq: seq, id : id, pw : pw, content : content, regDt : dateUtil.nowDateTypeDate()}},
                new: true
            },
            {fields : {'commentList.pw': 0}},
            function (err, data){
                if(err){
                    throw err;
                }

                res.send(data);
            });
    });
});

/**
 * 로그인 체크후
 * 댓글을 삭제 후 데이터 리턴
 */
router.delete('/:boardSeq/:seq', checkLogin.check, function(){
    var id = validator.isNull(req.param('id'))  ? error.throw(409,'Please check id.') : req.param('id');
    var pw = validator.isNull(req.param('pw'))  ? error.throw(409,'Please check password.') : cryptoUtil.encrypt(req.param('pw'), config.crypto.password);
    var regDt = validator.isNull(req.param('regDt'))  ? error.throw(409,'Please check regDt.') : req.param('regDt');

    Board.findOneAndUpdate(
        {_id: new ObjectId(req.params.seq)},
        {$pull: {id: id, pw: pw, regDt: regDt}, new: true},
        {fields : {'commentList.pw': 0}},
        function(err, data){
            if(err){
                throw err;
            }

            res.send(data);
        })
});

module.exports = router;