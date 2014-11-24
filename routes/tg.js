/**
 * Created by 동준 on 2014-11-24.
 */

var express = require('express');
var exec = require('child_process').exec;

var router = express.Router();

router.get('/msg', function( req, res ) {
    var _cmd = 'msg ' + ' 유자성 ' + req.param('msg',null);
    console.log( _cmd );
    exec( "echo '" + _cmd  + "' | telegram-cli -k /telegram/tg/tg-server.pub -W " ,
        function(err, stdout, stderr) {
            if(err) {
                console.log(err.message);
            }
        } );
    res.send('send msg');
});

module.exports = router;