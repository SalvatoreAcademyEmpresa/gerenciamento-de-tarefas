const express = require('express');
const commentController = require('./comment.controller');

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.getCommentsByPostId);
router.get('/:id', commentController.getCommentsById);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;