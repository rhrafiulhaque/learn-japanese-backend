const Router = require('express');
const { lessonControllers } = require('./lesson.controller');
const { verifyAuth, verifyAdmin } = require('../../middlewares/auth');



const router = Router();
router.post('/add', [verifyAuth, verifyAdmin], lessonControllers.lessonAdd);
router.patch('/:lessonId', [verifyAuth, verifyAdmin], lessonControllers.lessonUpdate);
router.delete('/:lessonId', [verifyAuth, verifyAdmin], lessonControllers.deleteLesson);
router.get('/', verifyAuth, lessonControllers.getAllLesson);



module.exports.LessonRouter = router


