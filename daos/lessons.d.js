/**
 * Created by woosa on 15/8/13.
 */
var Q = require('q');

var logger = require('../logger').dao;
var errors = require('../errors');

var lessons = require('../models/lessons.m');


module.exports = {
    create: create,
    findById: findById,
    findBySomeone: findBySomeone,
    findAllByPages: findAllByPages,
    findAll: findAll
    //deleteById: deleteById,
    //update: update
};


function create(info) {
    return lessons.create(info);
}

function findById(lessonId){
    return lessons.findById(lessonId);
}

function findBySomeone(params){
    var where = {};
    where[params.col_name] = params.col_value;

    return lessons.findAll({
        where: where,
        offset: params.offset,
        limit: params.limit,
        order: [
            ['updated_at', 'DESC']
        ]
    });
}

function findAllByPages(page){
    return lessons.findAll({
        offset: page.offset,
        limit: page.limit,
        order: [
            ['updated_at', 'DESC']
        ]
    });
}

function findAll(){
    return lessons.findAll({
        order: [
            ['updated_at', 'DESC']
        ]
    });
}

