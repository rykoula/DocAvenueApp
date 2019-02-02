import { ActionType } from "./types";
import config from "../config/config.dist";

export const fetchingPosts = () => {
  return async function(dispatch, getState) {
    try {
      dispatch(fetchPostsRequesting());
      let response = await fetch(config.api_url);
      let responseJsonData = await response.json();
      dispatch(fetchPostsSuccess(responseJsonData));
      return responseJsonData;
    } catch (error) {
      dispatch(fetchPostsError());
      throw error;
    }
  };
};

export const fetchPostsSuccess = response => {
  return {
    type: ActionType.FETCH_POSTS_SUCCESS,
    listPosts: { response }
  };
};

export const fetchPostsError = () => {
  return {
    type: ActionType.FETCH_POSTS_ERROR
  };
};

export const fetchPostsRequesting = () => {
  return {
    type: ActionType.FETCH_POSTS_REQUESTING
  };
};
