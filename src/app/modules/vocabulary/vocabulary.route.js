const Router = require('express');
const { verifyAuth, verifyAdmin } = require('../../middlewares/auth');
const { vocabularyControllers } = require('./vocabulary.controller');



const router = Router();
router.post('/add', [verifyAuth, verifyAdmin], vocabularyControllers.vocabularyAdd);
router.patch('/:vocId', [verifyAuth, verifyAdmin], vocabularyControllers.vocabularyUpdate);
router.delete('/:vocId', [verifyAuth, verifyAdmin], vocabularyControllers.deleteVocabulary);
router.get('/', verifyAuth, vocabularyControllers.getAllVocabulary);
router.get('/:lessonNo', verifyAuth, vocabularyControllers.getVocabularyByLessonId);



module.exports.VocabularyRouter = router


