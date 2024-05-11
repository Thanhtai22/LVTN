// favoritePostService.js

import db from '../models'; // Import database models

const FavoritePost = db.FavoritePost;

// Function to add a post to favorites
export const addPostToFavorites = async (userId, postId) => {
    try {
        // Check if the post already exists in favorites
        const existingFavorite = await FavoritePost.findOne({ where: { userId, postId } });

        // If the post does not exist in favorites, add it
        if (!existingFavorite) {
            await FavoritePost.create({ userId, postId });
            return { success: true, message: 'Post added to favorites' };
        } else {
            return { success: true, message: 'Post is already in favorites' };
        }
    } catch (error) {
        console.error('Error adding post to favorites:', error);
        throw new Error('Error adding post to favorites');
    }
};

const Post = db.Post; // Import Post model

// Function to get favorite posts by user ID
export const getFavoritePostsByUserId = (userId) => new Promise(async (resolve, reject) => {
    try {
        // Find all favorite posts for the given user ID
        const favoritePosts = await FavoritePost.findAll({ where: { userId: userId },            });

        // Map through the favoritePosts array to get the post IDs
        const postIds = favoritePosts.map(favorite => favorite.postId);

        // Find all posts with IDs in the postIds array
        const posts = await Post.findAll({ where: { id: postIds },            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' },
                { model: db.Label, as: 'labelData', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']  });

        resolve(posts); // Resolve with the array of favorite posts
    } catch (error) {
        console.error('Error getting favorite posts:', error);
        reject('Error getting favorite posts');
    }
});

export const deleteFavoritePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await FavoritePost.destroy({
            where: { postId: postId },
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'Deleting favorite posts is failed.',
        })

    } catch (error) {
        reject(error)
    }
})