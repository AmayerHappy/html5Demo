module.exports = function (h5Demo) {
    require('./prize_info.r')(h5Demo);
    require('./win_info.r')(h5Demo);
    require('./lessons.r')(h5Demo);
    require('./wechat.r')(h5Demo);
};
