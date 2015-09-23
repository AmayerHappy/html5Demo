/**
 * Created by woosa on 15/8/13.
 */
var _ = require('lodash');
var Q = require('q');

var logger = require('../logger').service;
var errors = require('../errors');

var lessonsDao = require('../daos/lessons.d');


module.exports = {
    createLesson: createLesson,
    getLessonById: getLessonById,
    getLessonsPagesBySomeone: getLessonsPagesBySomeone,
    getLessonsPages: getLessonsPages,
    getLessonsList: getLessonsList
};

function createLesson(lesson){
    return lessonsDao.create(lesson);
}

function getLessonById(id){
    return lessonsDao.findById(id);
}

function getLessonsPagesBySomeone(pramas){
    return lessonsDao.findBySomeone(pramas);
}

function getLessonsPages(page){
    return lessonsDao.findAllByPages(page);
}

function getLessonsList(){
    return lessonsDao.findAll();
}