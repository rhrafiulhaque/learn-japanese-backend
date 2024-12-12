const Router = require('express');
const { verifyAuth, verifyAdmin } = require('../../middlewares/auth');
const { tutorialControllers } = require('./tutorial.controller');



const router = Router();
router.post('/add', [verifyAuth, verifyAdmin], tutorialControllers.tutorialAdd);
router.patch('/:tutorialId', [verifyAuth, verifyAdmin], tutorialControllers.tutorialUpdate);
router.delete('/:tutorialId', [verifyAuth, verifyAdmin], tutorialControllers.deleteTutorial);
router.get('/', verifyAuth, lessonControllers.getAllLesson);



module.exports.TutorialRouter = router


