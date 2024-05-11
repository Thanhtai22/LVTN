// favoritePostController.js

import * as services from '../services/favoritePost'


// Controller function to add a post to favorites
export const addPostToFavoritesController = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const result = await services.addPostToFavorites(userId, postId);
        res.json(result);
    } catch (error) {
        console.error('Error adding post to favorites:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Controller function to get favorite posts by userId
export const getFavoritePostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters
        // Call service function to get favorite posts by userId
        const favoritePosts = await services.getFavoritePostsByUserId(userId);
        return res.status(200).json(favoritePosts); // Return favorite posts
    } catch (error) {
        console.error('Error getting favorite posts by userId:', error);
        return res.status(500).json({
            error: true,
            message: 'Failed to get favorite posts by userId.'
        });
    }
};

export const deleteFavoritePostsByPostId = async (req, res) => {
    try {
        const { postId } = req.params; // Get userId from request parameters
        // Call service function to get favorite posts by userId
        const favoritePosts = await services.deleteFavoritePost(postId);
        return res.status(200).json(favoritePosts); // Return favorite posts
    } catch (error) {
        console.error('Error getting favorite posts by userId:', error);
        return res.status(500).json({
            error: true,
            message: 'Failed to get favorite posts by userId.'
        });
    }
};
