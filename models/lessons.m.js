/**
 * Created by woosa on 15/8/13.
 */
var Sequelize = require('sequelize');
var db = require('./sequelize/database');

module.exports = db.define('lessons', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        reason: Sequelize.STRING,
        solution: Sequelize.STRING,
        label: Sequelize.STRING,
        department: Sequelize.STRING,
        catalog: Sequelize.STRING,
        author: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        is_published: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'lessons'
    }
);