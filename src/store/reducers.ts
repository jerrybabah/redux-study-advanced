import { combineReducers } from 'redux';
import { SELECT_REDDIT, INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS,
  SelectActionType, PostsActionType, SelectedRedditType,
  ISubReddit, IPostsByReddit } from './types';

// const initialState: IStoreState = {
//   selectedReddit: 'reactjs',
//   postsByReddit: {
//     reactjs: {
//       isFetching: false,
//       didInvalidate: false,
//       items: [],
//     },
//     frontend: {
//       isFetching: false,
//       didInvalidate: false,
//       items: [],
//     },
//   },
// };

function selectedRedditReducer(state: SelectedRedditType = 'reactjs', action: SelectActionType) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit;
    default:
      return state;
  }
}

function postsReducer(state: ISubReddit = { isFetching: false, didInvalidate: false, items: [] }, action: PostsActionType) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postByRedditReducer(state: IPostsByReddit = {}, action: PostsActionType) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return;
    case RECEIVE_POSTS:
      return;
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: postsReducer(state[action.reddit], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedReddit: selectedRedditReducer,
  postsByReddit: postByRedditReducer
});

export default rootReducer;