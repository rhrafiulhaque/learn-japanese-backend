const Router = require('express');
const { verifyAuth, verifyAdmin } = require('../../middlewares/auth');
const { tutorialControllers } = require('./tutorial.controller');



const router = Router();
router.post('/add', [verifyAuth, verifyAdmin], tutorialControllers.tutorialAdd);
router.patch('/:tutorialId', [verifyAuth, verifyAdmin], tutorialControllers.tutorialUpdate);
router.get('/:tutorialId', verifyAuth, tutorialControllers.getTutorialById);
router.delete('/:tutorialId', [verifyAuth, verifyAdmin], tutorialControllers.deleteTutorial);
router.get('/', verifyAuth, tutorialControllers.getAllTutorial);



module.exports.TutorialRouter = router


