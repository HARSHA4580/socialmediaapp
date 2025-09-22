const router = require('express').Router();
const userController = require('../controllers/userController');

router.put('/:id/follow', userController.followUser);

module.exports = router;
