import actionTypes from './actionTypes'
import { apiGetNewPosts, apiGetPosts, apiGetPostsLimit, apiGetPostsLimitAdmin, apiUpdatePostLikeStatus } from '../../services/post'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}
export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}
export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}


export const getPostsLimitAdmin = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimitAdmin(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                msg: response.data.msg,
                posts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_ADMIN,
            posts: null
        })
    }
}

export const editData = (dataEdit) => ({
    type: actionTypes.EDIT_DATA,
    dataEdit
})
export const resetDataEdit = () => ({
    type: actionTypes.RESET_DATAEDIT,
})

export const getOutStandingPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit({
            limitPost: 5,
            order: ['star', 'DESC']
        })
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                outStandingPost: response.data.response.rows,
            })
        } else {
            dispatch({
                type: actionTypes.GET_OUTSTANDING,
                msg: response.data.msg,
                outStandingPost: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_OUTSTANDING,
            outStandingPost: null
        })
    }
}

// Action creator to update post like status
export const updatePostLikeStatus = (postId, isLiked) => async (dispatch) => {
    try {
        // Make an API call to update the like status of the post
        const response = await apiUpdatePostLikeStatus(postId, isLiked);

        // Dispatch an action based on the API response
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_POST_LIKE_STATUS_SUCCESS,
                postId,
                isLiked
            });
        } else {
            dispatch({
                type: actionTypes.UPDATE_POST_LIKE_STATUS_FAILURE,
                error: response?.data.msg || 'Failed to update like status'
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_POST_LIKE_STATUS_FAILURE,
            error: error.message || 'Failed to update like status'
        });
    }
};

export const setShowFavorites = (showFavorites) => ({
    type: actionTypes.SET_SHOW_FAVORITES,
    payload: showFavorites,
  });
