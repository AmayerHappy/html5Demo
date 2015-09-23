/**
 * Created by nic on 15/8/26.
 */

var wechatCtrl = require('../controllers/wechat.c');

module.exports = function (h5Demo) {

    /**
     * 获取access_token
     */
    h5Demo.get('/api/we_chat/', wechatCtrl.getToken);

    /**
     * 接收微信token验证消息
     */
    h5Demo.get('/api/we_chat/verify/', wechatCtrl.verifyToken);

    /**
     * 获取code
     */
    h5Demo.get('/api/we_chat/sns_api/:scope', wechatCtrl.getCode);

    /**
     * web网页授权
     */
    h5Demo.get('/api/we_chat/web_grant/:webpage', wechatCtrl.webGrant);

    /**
     * 获取用户openId
     */
    //h5Demo.get('/api/we_chat/sns_api/:scope', wechatCtrl.getUserInfo);

    ///**
    // * 查看单个记录
    // */
    //h5Demo.get('/api/lessons/:id', wechatCtrl.getLessonById);
    //
    ///**
    // *按照某个字段查询
    // */
    //h5Demo.get('/api/lessons/query/:column_name/value/:column_value', wechatCtrl.getLessonsPages);
    //
    ///**
    // *查询所有记录
    // */
    //h5Demo.get('/api/lessons/query/all/', wechatCtrl.getLessonsList);

}
