// commentRoutes.js

import express from 'express';
import * as commentController from '../controllers/comment'; // Import comment controller
import verifyToken from '../middlewares/verifyToken'; // Import middleware for token verification

const router = express.Router();

// Routes for comment
router.use(verifyToken); // Apply token verification middleware to all routes below

router.post('/add', commentController.addComment); // Route to add a comment
router.get('/get/:postId', commentController.getCommentsByPostId); // Route to get comments by post ID

export default router;
