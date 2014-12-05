/**
 * Created by 동준 on 2014-12-05.
 */
var express = require('express');
var config = require('../config/config');
var multiparty = require('multiparty');
var error = require('../util/error');
var fs = require('fs');

/* 라우터 */
var router = express.Router();

/**
 * 로그인 체크
 */
router.post('/', function(req, res){
    var form = new multiparty.Form();
    form.uploadDir = config.file.path ;
    form.maxFilesSize   = config.file.max_size;
    form.parse(req, function(err, fields, files) {
        if(err){
            /* 에러 자동 감지를 벗어나기 위해 이렇게 넣는다. */
            error.throw(4019, err);
        }

        var resultObj = {
            result: 'ok',
            name: files.myFile[0].originalFilename.toString(),
            path: files.myFile[0].path.toString(),
            url: "/upload/" + files.myFile[0].path.replace(/(\/([^>]+)\/)/ig,"").replace(/(\\([^>]+)\\)/ig,""),
            virtualName: files.myFile[0].path.replace(/(\/([^>]+)\/)/ig,"").replace(/(\\([^>]+)\\)/ig,""),
            size: files.myFile[0].size.toString(),
            type : files.myFile[0].headers['content-type'].toString()
        };

        res.send(resultObj);
    });
});

module.exports = router;