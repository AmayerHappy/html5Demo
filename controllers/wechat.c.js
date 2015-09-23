/**
 * Created by nic on 15/8/26.
 */
var logger = require('../logger').controller;
var errors = require('../errors');

var weChatService = require('../services/wechat.s');


module.exports = {
    getToken: getToken,
    verifyToken: verifyToken,
    getCode: getCode,
    webGrant: webGrant,
};

function getToken(req, res, next){
    weChatService.getAccessToken().then(function(data) {
        res.send(data);
    });
}

function verifyToken(req, res, next){
    var body = {
        "signature": req.query.signature,
        "timestamp": req.query.timestamp,
        "nonce": req.query.nonce,
        "echostr": req.query.echostr
    }
    logger.info(body);
    weChatService.verifyAccessToken(body).then(function(data) {
        res.send(data);
    });

}

//function getUserInfo(req, res, next){
//    var scope = req.params.scope;
//    weChatService.getUserInfo(scope).then(function(data) {
//        res.send(data);
//    });
//}

function getCode(req, res, next){
    var scope = req.params.scope;
    logger.debug(scope);
    weChatService.getCode(scope).then(function(data) {
        res.send(data);
    });
}

function webGrant(req, res, next){
    var code = req.query.code;
    var webpage = req.params.webpage;
    logger.debug(code);
    weChatService.webGrant(code).then(function(data) {
        if(data.scope == 'snsapi_userinfo'){
            var user = {
                'openId': data.openid,
                'accessToken': data.access_token
            }
            weChatService.getUserInfo(user).then(function(userinfo) {
                res.redirect('/htmls/'+ webpage + '.html?openid=' + userinfo.openid + '&nickname=' + userinfo.nickname + '&headimgurl=' + userinfo.headimgurl);
            });
        }else{
            res.redirect('/htmls/'+ webpage + '.html?openid=' + data.openid);
        }
    });
}

