/**
 * Created by woosa on 15/8/6.
 */
var logger = require('../logger').controller;
var errors = require('../errors');

var winInfoService = require('../services/win_info.s');


module.exports = {
    createWinInfo: createWinInfo,
    getWinInfo: getWinInfo,
    getWinInfos: getWinInfos,
    getWinInfosByPrizeName: getWinInfosByPrizeName,
    getSumWinInfosByPrizeName: getSumWinInfosByPrizeName
};


function createWinInfo(req, res, next) {
    var winInfo = req.body;
    winInfoService
        .createWinInfo(winInfo) //promise
        .then(function (result) {
            res.status(201).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getWinInfo(req, res, next) {
    var id = req.params.id;
    logger.debug(id);

    winInfoService.getWinInfoById(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getWinInfos(req, res, next) {
    var userId = req.params.user_id;
    logger.debug(userId);
    winInfoService.getWinInfoByUserId(userId)
        .then(function (winInfos) {
            res.json(winInfos);
        })
        .catch(function (err) {
            next(err);
        });
}


function getWinInfosByPrizeName(req, res, next) {
    var prizeName = req.params.prize_name;
    logger.debug(prizeName);
    winInfoService.getWinInfosByPrizeName(prizeName)
        .then(function (winInfos) {
            res.json(winInfos);
        })
        .catch(function (err) {
            next(err);
        });
}


function getSumWinInfosByPrizeName(req, res, next) {
    var prizeName = req.params.prize_name;
    var prizeId = req.params.prize_id;
    var winPrize = {
        "prize_name": prizeName,
        "prize_id": prizeId
    }

    logger.debug(prizeName);
    winInfoService.getSumWinInfosByPrizeName(winPrize)
        .then(function (winInfos) {
            res.json(winInfos);
        })
        .catch(function (err) {
            next(err);
        });
}
