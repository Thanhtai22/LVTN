// favoritePostRoutes.js

import express from 'express';
import * as favoritePostController from '../controllers/favoritePost'; // Import favorite post controller
import verifyToken from '../middlewares/verifyToken'; // Import middleware for token verification

const router = express.Router();

// Routes for favorite post
// router.use(verifyToken); // Apply token verification middleware to all routes below

router.post('/add', favoritePostController.addPostToFavoritesController);
router.get('/get/:userId', favoritePostController.getFavoritePostsByUserId); // Route to get favorite posts by user
router.delete('/delete/:postId', favoritePostController.deleteFavoritePostsByPostId);

export default router;
