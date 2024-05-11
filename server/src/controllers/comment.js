// commentController.js

import * as commentService from '../services/comment'; // Import comment service

// Controller function to add a comment
export const addComment = async (req, res) => {
    try {
        const { userId, postId, content } = req.body; // Get userId, postId, and content from request body
        if (!userId || !postId || !content) { // Check if userId, postId, or content is missing
            return res.status(400).json({
                error: true,
                message: 'userId, postId, and content are required fields.'
            });
        }
        // Call service function to add comment
        const result = await commentService.createComment(userId, postId, content);
        return res.status(200).json(result); // Return success message
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({
            error: true,
            message: 'Failed to add comment.'
        });
    }
};

// Controller function to get comments by postId
export const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from request parameters
        // Call service function to get comments by postId
        const comments = await commentService.getCommentsByPostId(postId);
        return res.status(200).json(comments); // Return comments
    } catch (error) {
        console.error('Error getting comments by postId:', error);
        return res.status(500).json({
            error: true,
            message: 'Failed to get comments by postId.'
        });
    }
};
