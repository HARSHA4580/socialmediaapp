const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.put('/:id/like', postController.likePost);
router.post('/:id/comment', postController.commentPost);

module.exports = router;
