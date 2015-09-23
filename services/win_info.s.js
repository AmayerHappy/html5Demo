/**
 * Created by woosa on 15/8/6.
 */
var _ = require('lodash');
var Q = require('q');

var logger = require('../logger').service;
var errors = require('../errors');

var winInfoDao = require('../daos/win_info.d');
var prizeInfoDao = require('../daos/prize_info.d');


module.exports = {
    getWinInfoById: getWinInfoById,
    createWinInfo: createWinInfo,
    getWinInfoByUserId: getWinInfoByUserId,
    getWinInfosByPrizeName: getWinInfosByPrizeName,
    getSumWinInfosByPrizeName: getSumWinInfosByPrizeName
};

function getWinInfoById(id) {
    return winInfoDao.findById(id);
}

function createWinInfo(winInfo) {
    return winInfoDao.create(winInfo);
}

function getWinInfoByUserId(userId){
    return winInfoDao.findByUserId(userId);
}

function getWinInfosByPrizeName(prizeName){
    return winInfoDao.findByPrizeName(prizeName);
}

function getSumWinInfosByPrizeName(winPrize){
    return winInfoDao.getSumByPrizeName(winPrize);
}