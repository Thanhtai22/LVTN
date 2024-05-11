import db from "../models"; // Import database models

const Comment = db.Comment; // Import Comment model

// Function to create a new comment
export const createComment = (userId, postId, content) =>
  new Promise(async (resolve, reject) => {
    try {
      // Create a new comment in the Comment table
      const newComment = await Comment.create({
        userId: userId,
        postId: postId,
        commentId: generateRandomUUID(), // Assuming you have a function to generate unique comment IDs
        content: content,
      });

      resolve(newComment); // Resolve with the newly created comment
    } catch (error) {
      console.error("Error creating comment:", error);
      reject("Error creating comment");
    }
  });

// Function to get comments by postId
export const getCommentsByPostId = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      // Find all comments that belong to the specified postId
      let comments = await Comment.findAll({
        where: {
          postId: postId,
        },
      });
      resolve(comments); // Resolve with the array of comments
    } catch (error) {
      console.error("Error getting comments by postId:", error);
      reject("Error getting comments by postId");
    }
  });

function generateRandomUUID() {
  const hexDigits = "0123456789abcdef";
  let uuid = "";
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else if (i === 14) {
      uuid += "4"; // Version 4 UUID
    } else if (i === 19) {
      uuid += hexDigits[(Math.random() * 4) | 8]; // Generate random value for the '4' bit
    } else {
      uuid += hexDigits[Math.floor(Math.random() * 16)];
    }
  }
  return uuid;
}
