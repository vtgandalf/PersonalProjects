const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth');
const UserController = require('../controllers/user');

router.get('/', UserController.user_get_all);

router.post('/signup', UserController.user_post_signup);

router.post('/login', UserController.user_post_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;