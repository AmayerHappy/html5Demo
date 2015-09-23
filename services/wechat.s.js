/**
 * Created by nic on 15/8/26.
 */
var _ = require('lodash');
var Q = require('q');
var request = require('request');

var logger = require('../logger').service;
var errors = require('../errors');
var sign = require('../utils/sign');
var urlencode = require('urlencode');
var config = global.config;
var we_chat = config.WE_CHAT;
var sysCache = global.cache


module.exports = {
    getAccessToken: getAccessToken,
    verifyAccessToken: verifyAccessToken,
    getUserInfo: getUserInfo,
    getCode: getCode,
    webGrant: webGrant
};

function getAccessToken() {
    var deferred = Q.defer();
    logger.debug(sysCache.get('access_token'));
    if(sysCache.get('access_token') == null){
        var url = 'https://api.weixin.qq.com/cgi-bin/token';
        request({
                url: url,
                qs: {
                    //woosa 测试号
                    //grant_type: 'client_credential',
                    //appid: 'wxa6e80024f55c6353',
                    //secret: '0f8ebb3b60c7a9f6f0e687988a4c53d9'
                    //途说账号
                    grant_type: 'client_credential',
                    appid: we_chat.APPID,
                    secret: we_chat.SECRET
                },
                json: true
            },
            function (error, response, body) {
                logger.debug(body);
                sysCache.put('access_token', body.access_token, body.expires_in * 1000);
                logger.debug(sysCache.get('access_token'));
            }
        );
    }
    deferred.resolve(sysCache.get('access_token'));
    return deferred.promise;
}

function verifyAccessToken(data){
    var deferred = Q.defer();

    var token = we_chat.TOKEN;
    var paraArr = [token,data.timestamp,data.nonce];
    paraArr = paraArr.sort();

    var paraStr = sign.arrToStr(paraArr);
    var flag  = sign.verify(paraStr,data.signature);

    if(flag){
        body = data.echostr;

    }else{
        body = 'error';
    }
    logger.info(body);
    deferred.resolve(body);

    return deferred.promise;
}

function getCode(scope){
    var deferred = Q.defer();
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';

    var callBackUrl = urlencode(we_chat.BACK_URL + '/api/we_chat/web_grant/');
    request({
            url: url,
            qs: {
                // appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE&connect_redirect=1#wechat_redirect
                appid: we_chat.APPID,
                redirect_uri: callBackUrl,
                response_type: 'code',
                scope: scope,
                state: '123#wechat_redirect'
            },
            json: true
        },
        function (error, response, body) {

            if (!error && response.statusCode == 200) {
                logger.debug(body);// Show the HTML for the Google homepage.
                deferred.resolve(body);
            }
        }
    );
    return deferred.promise;
}

function webGrant(code){
    var deferred = Q.defer();
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token';
    request({
            url: url,
            qs: {
                //eg: ?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
                appid: we_chat.APPID,
                secret: we_chat.SECRET,
                code: code,
                grant_type: 'authorization_code'
            },
            json: true
        },
        function (error, response, body) {
            logger.debug(body);

            deferred.resolve(body);
        }
    );
    return deferred.promise;
}

function getUserInfo(user){
    var deferred = Q.defer();
    var url = 'https://api.weixin.qq.com/sns/userinfo';
    request({
            url: url,
            qs: {
                //eg: ?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
                access_token: user.accessToken,
                openid: user.openId,
                lang: 'zh_CN'
            },
            json: true
        },
        function (error, response, body) {
            logger.debug(body);
            deferred.resolve(body);
        }
    );
    return deferred.promise;
}



