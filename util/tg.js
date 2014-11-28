/**
 * Created by 동준 on 2014-11-24.
 */
var exec = require('child_process').exec;
var colors = require('colors');
var config = require('../config/config');

exports.sendMsg = function(msg){
    var _cmd = 'msg ' + ' 권동준 ' +  msg;
    exec( "echo '" + _cmd  + "' | "+config.tg.path+"bin/telegram-cli -k "+config.tg.path+"/tg-server.pub " ,
        function(err, stdout, stderr) {
            if(err) {
                console.log(err.message.red);
            }else{
                console.log(('telegram sent : ' + msg).green);
            }
        } );
};