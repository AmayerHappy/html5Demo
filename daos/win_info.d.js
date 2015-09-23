/**
 * Created by woosa on 15/8/6.
 */
var Q = require('q');

var logger = require('../logger').dao;
var errors = require('../errors');

var winInfo = require('../models/win_info.m');


module.exports = {
    create: create,
    list: list,
    findById: findById,
    findByUserId: findByUserId,
    findByPrizeName: findByPrizeName,
    getSumByPrizeName: getSumByPrizeName,
    deleteById: deleteById,
    update: update
};


function create(info) {
    return winInfo
        .create(info);

}

function list() {
    var deferred = Q.defer();
    winInfo
        .findAll()
        .success(function (prizeInfos) {
            var result = [];
            prizeInfos.forEach(function (prizeInfo) {
                prizeInfo = prizeInfo.values;
                if (prizeInfo.saved_widgets) {
                    prizeInfo.saved_widgets = true;
                }
                result.push(prizeInfo);
            });
            deferred.resolve(result);
        })
        .error(function (err) {
            deferred.reject(new errors.DatabaseError(err.name + ': ' + err.message));
        });
    return deferred.promise;
}

function update(prizeInfo) {
    var deferred = Q.defer();
    if (!prizeInfo.saved_widgets && prizeInfo.is_published) {
        prizeInfo.published_at = new Date();
    } else {
        if (prizeInfo.published_at) {
            delete prizeInfo.published_at;
        }
    }
    winInfo
        .update(prizeInfo, {id: prizeInfo.id})
        .success(function (affectedRows) {
            if (affectedRows === 0) {
                deferred.reject(new errors.NotFoundError('lessons ' + prizeInfo.id + ' not found!'));
            } else {
                deferred.resolve();
            }
        })
        .error(function (err) {
            deferred.reject(new errors.DatabaseError(err.name + ': ' + err.message));
        });
    return deferred.promise;
}

function findById(winInfoId) {
    return winInfo.findById(winInfoId);
}

function findByUserId(userId) {
    logger.info(userId);
    return winInfo.findAll({
        where: {
            user_id: userId
        }
    });
}

function findByPrizeName(prizeName) {
    logger.debug(prizeName);
    return winInfo.findAll({
        where: {
            prize_name: prizeName
        },
        order: [
            ['created_at', 'DESC']
        ]

    });
}

function deleteById(winInfoId) {
    var deferred = Q.defer();
    winInfo
        .destroy({
            id: winInfoId
        })
        .success(function (affectedRows) {
            deferred.resolve(affectedRows);
        })
        .error(function (err) {
            deferred.reject(new errors.DatabaseError(err.name + ': ' + err.message));
        });
    return deferred.promise;
}

function getSumByPrizeName(winPrize) {
    logger.info(winPrize);
    return winInfo.count({
        where: {
            prize_name: winPrize.prize_name,
            prize_id: winPrize.prize_id
        }
    });
}