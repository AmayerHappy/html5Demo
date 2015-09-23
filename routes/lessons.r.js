/**
 * Created by woosa on 15/8/13.
 */
var lessonsCtrl = require('../controllers/lessons.c');

module.exports = function (h5Demo) {

    /**
     * 插入记录
     */
    h5Demo.post('/api/lessons/', lessonsCtrl.createLesson);

    /**
     * 查看单个记录
     */
    h5Demo.get('/api/lessons/:id', lessonsCtrl.getLessonById);

    /**
     *按照某个字段查询
     */
    h5Demo.get('/api/lessons/query/:column_name/value/:column_value', lessonsCtrl.getLessonsPages);

    /**
     *查询所有记录
     */
    h5Demo.get('/api/lessons/query/all/', lessonsCtrl.getLessonsList);

}