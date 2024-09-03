const commentService = require('./comment.service');

async function createComment(req, res) {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
}

async function getCommentsByPostId(req, res) {
    try {
        const comments = await commentService.getCommentsByPostId(req.params.postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve comments', error });
    }
}

async function getCommentsById(req, res) {
    try {
        const comment = await commentService.getCommentsById(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve comment', error });
    }
}

async function updateComment(req, res) {
    try {
        const updateComment = await commentService.updateComment(req.params.id, req.body);
        if (updateComment) {
            res.status(200).json(updateComment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update commment', error });
    }
}
async function deleteComment(req, res) {
    try {
        const result = await commentService.deleteComment(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Comment deleted successfully'});            
        }else {
            res.status(404).json({ message: 'Comment not found'});
        }
    } catch(error){
        res.status(500).json({ message: 'Failed to delete comment', error});
    }
}

module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentsById,
    updateComment,
    deleteComment,
};