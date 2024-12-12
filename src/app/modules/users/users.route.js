const Router = require('express')
const { usersControllers } = require('./users.controller');
const { verifyAuth, verifyAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');



const router = Router();
router.post('/register', upload.single('profilePhoto'), usersControllers.registerUser);
router.post('/login', usersControllers.loginUser);
router.get('/allusers', [verifyAuth, verifyAdmin], usersControllers.getAllUsers);
router.patch('/update-user-role/:userId', [verifyAuth, verifyAdmin], usersControllers.updateUserRole);
router.post('/refresh-token', usersControllers.refreshToken);


module.exports = router


