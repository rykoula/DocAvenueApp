import { ActionType } from "../actions/types";
const initialState = { listPosts: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_POSTS_SUCCESS:
      const newListe = action.listPosts.response
        .sort(function(post1, post2) {
          let postOne = post1.title.toLowerCase(),
            postTwo = post2.title.toLowerCase();
          if (postOne < postTwo) return -1;
          if (postOne > postTwo) return 1;
          return 0;
        })
        .slice(0, 50);
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
