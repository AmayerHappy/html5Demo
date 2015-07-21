var logger = require('../logger');

exports = module.exports = function (req, res, next) {

    // Ϊres��� err �� throwError ����
    res.err = res.throwError = function (err) {
        logger.filter.error(err);
        res.status(err.status || 500);
        res.json({
            message: err.message
        });
    };

    next();
};