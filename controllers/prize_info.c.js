/**
 * Created by woosa on 15/7/20.
 */
var logger = require('../logger').controller;
var errors = require('../errors');

var prizeInfoService = require('../services/prize_info.s');


module.exports = {
    createPrizeInfo: createPrizeInfo,
    getPrizeInfo: getPrizeInfo,
    getPrizeInfos: getPrizeInfos,
    queryPrizeInfos: queryPrizeInfos,
    updatePrizeInfo: updatePrizeInfo,
    deletePrizeInfo: deletePrizeInfo,
    saveAsPrizeInfo: saveAsPrizeInfo,
    getPrizeByOrder: getPrizeByOrder
};


function createPrizeInfo(req, res, next) {
    var prizeInfo = req.body;
    prizeInfoService
        .createPrizeInfo(prizeInfo) //promise
        .then(function (result) {
            res.status(201).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getPrizeInfo(req, res, next) {
    var id = req.params.id;
    logger.info(id);

    prizeInfoService.getPrizeInfoById(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getPrizeInfos(req, res, next) {
    var name = req.params.name;
    logger.info(name);
    prizeInfoService.getPrizeInfoByName(name)
        .then(function (prizeInfos) {
            res.json(prizeInfos);
        })
        .catch(function (err) {
            next(err);
        });
}

function queryPrizeInfos(req, res, next) {
    prizeInfoService
        .listPrizeInfos()
        .then(function (prizeInfos) {
            res.json(prizeInfos);
        })
        .catch(function (err) {
            next(err);
        });
}

function updatePrizeInfo(req, res, next) {
    var prizeInfo = req.body;

    if (prizeInfo.managers) {
        prizeInfo.managers = prizeInfo.managers.replace(/\s/g, '');
        if (/[^0-9a-z_\-.,]/i.test(prizeInfo.managers)) {
            var err = new errors.InvalidParametersError('managers');
            next(err);
            return;
        }
        prizeInfo.managers = prizeInfo.managers.replace(/^,*|,*$/g, '');
    } else {
        //delete managers
        prizeInfo.managers = '';
    }

    prizeInfoService
        .updatePrizeInfo(prizeInfo)
        .then(function (prizeInfo) {
            res.json(prizeInfo);
        })
        .catch(function (err) {
            next(err);
        });
}

function deletePrizeInfo(req, res, next) {
    var prizeInfoId = req.params.prizeInfo_id;
    prizeInfoService
        .deletePrizeInfoById(prizeInfoId)
        .then(function () {
            res.status(204).json({});
        })
        .catch(function (err) {
            next(err);
        });
}

function saveAsPrizeInfo(req, res, next) {
    var prizeInfoId = req.params.prizeInfo_id;
    var prizeInfo = req.body;

    prizeInfoService
        .saveAs(prizeInfoId, prizeInfo)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getPrizeByOrder(req, res, next) {
    var prizeName = req.params.name;
    var prizeOrder = req.params.order;
    var prize = {
        "prize_name": prizeName,
        "prize_order": prizeOrder
    }
    logger.info(prize);
    prizeInfoService.getPrizeInfoByOrder(prize)
        .then(function (prizeInfos) {
            res.json(prizeInfos);
        })
        .catch(function (err) {
            next(err);
        });
}
