import axiosConfig from "../axiosConfig"; // Assuming axiosConfig is properly defined

export const saveFavoritePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/favoritePost/add",
        data: payload, // Assuming userId and postId are passed as arguments
      });
      resolve(response.data);
    } catch (error) {
      reject(new Error("Failed to save favorite post: " + error.message));
    }
  });

export const getFavoritePostsByUserId = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/favoritePost/get/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const deleteFavoritePostsByPostId = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/favoritePost/delete/${postId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
