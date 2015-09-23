var log4js = require('log4js'),
    DATE_FILE_PATTERN = '.yyyy-MM-dd',
    LOGS_DIR = './log/',
    MAX_LOG_SIZE = 10485760, // 10M
    BACKUPS = 30;

var fs = require('fs');
if (!fs.existsSync('log')) {
    fs.mkdirSync('log');
}

log4js.configure(
    {
        'appenders': [
            { 'type': 'console' },
            {
                'type': 'dateFile',
                'pattern': DATE_FILE_PATTERN,
                'filename': LOGS_DIR + 'express.log',
                'backups': BACKUPS,
                'category': 'express',
                'alwaysIncludePattern': false
            },
            {
                'type': 'dateFile',
                'pattern': DATE_FILE_PATTERN,
                'filename': LOGS_DIR + 'server.log',
                'backups': BACKUPS,
                'category': ['app', 'filter', 'controller', 'service', 'dao', 'error'],
                'alwaysIncludePattern': false
            },
            {
                'type': 'file',
                'filename': LOGS_DIR + 'uncaughtException.log',
                'maxLogSize': MAX_LOG_SIZE,
                'backups': BACKUPS,
                'category': 'uncaughtException'
            }
        ]
    }
);

var app = log4js.getLogger('app');
app.setLevel('Info');

var express = log4js.getLogger('express');
express.setLevel('Info');

var filter = log4js.getLogger('filter');
filter.setLevel('Debug');

var controller = log4js.getLogger('controller');
controller.setLevel('Debug');

var service = log4js.getLogger('service');
service.setLevel('Debug');

var dao = log4js.getLogger('dao');
dao.setLevel('Debug');

var sign = log4js.getLogger('sign');
sign.setLevel('Debug');

var error = log4js.getLogger('error');
error.setLevel('Debug');

var uncaughtException = log4js.getLogger('uncaughtException');
uncaughtException.setLevel('Error');


module.exports = {
    app: app,
    express: express,
    filter: filter,
    controller: controller,
    service: service,
    dao: dao,
    sign: sign,
    error: error,
    uncaughtException: uncaughtException
};
