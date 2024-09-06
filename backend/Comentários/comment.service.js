const Comment = require('./comment.model');

async function createComment(commentData){
    const comment = new Comment(commentData);
    return await comment.save();
}

async function getCommentsByPostId(postId) {
    return await Comment.find({ postId });
}
async function getCommentsById(commentId) {
    return await Comment.findById(commentId);    
}

async function updateComment(commentId, updatedData) {
    return await Comment.findByIdAndUpdate(commentId, updatedData, { new:true });    
}

async function deleteComment(commentId) {
    return await Comment.findByIdAndDelete(commentId);
}

module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentsById,
    updateComment,
    deleteComment,
}