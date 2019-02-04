import { ActionType } from "../actions/types";
import config from "../config/config.dist";
const initialState = { listPosts: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_POSTS_SUCCESS:
      let newListe = action.listPosts.response;
      newListe = newListe.slice(0, config.PAGINATION_MAX);
      newListe = newListe.sort(function(post1, post2) {
        let postOne = post1.title.toLowerCase(),
          postTwo = post2.title.toLowerCase();
        if (postOne < postTwo) return -1;
        if (postOne > postTwo) return 1;
        return 0;
      });
      return {
        ...state,
        listPosts: newListe
      };
    case ActionType.FETCH_POSTS_REQUESTING:
      return state;
    case ActionType.FETCH_POSTS_ERROR:
      return state;
    default:
      return state;
  }
};
