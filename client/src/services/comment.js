import axiosConfig from "../axiosConfig";

export const createComment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/comment/add`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getCommentsByPostId = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/comment/get/${postId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
