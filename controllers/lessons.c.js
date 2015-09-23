/**
 * Created by woosa on 15/8/13.
 */
var logger = require('../logger').controller;
var errors = require('../errors');

var lessonsService = require('../services/lessons.s');


module.exports = {
    createLesson: createLesson,
    getLessonById: getLessonById,
    getLessonsPagesBySomeone: getLessonsPagesBySomeone,
    getLessonsPages: getLessonsPages,
    getLessonsList: getLessonsList
};

function createLesson(req, res, next) {
    var lesson = req.body;
    logger.info(lesson);

    lessonsService.createLesson(lesson) //promise
        .then(function (result) {
            res.status(201).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getLessonById(req, res, next){
    var id = req.params.id;
    logger.info(id);
    lessonsService.getLessonById(id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            next(err);
        });
}

function getLessonsPagesBySomeone(req, res, next){
    var colName = req.params.column_name;
    var colValue = req.params.column_value;
    var startNo = req.params.start_no;
    var limitNum = req.params.limit_num;
    var pramas = {
        "col_name": colName,
        "col_value": colValue,
        "offset": startNo,
        "limit": limitNum
    }
    lessonsService.getLessonsPagesBySomeone(pramas)
        .then(function (lessons) {
            res.json(lessons);
        })
        .catch(function (err) {
            next(err);
        });

}

function getLessonsPages(req, res, next){
    var startNo = req.params.start_no;
    var limitNum = req.params.limit_num;
    var page = {
        "offset": startNo,
        "limit": limitNum
    }
    lessonsService.getLessonsPages(page)
        .then(function (lessons) {
            res.json(lessons);
        })
        .catch(function (err) {
            next(err);
        });
}

function getLessonsList(req, res, next){
    lessonsService.getLessonsList()
        .then(function (lessons) {
            res.json(lessons);
        })
        .catch(function (err) {
            next(err);
        });
}