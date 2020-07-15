import fetch from 'node-fetch';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SelectActionType, PostsActionType,
  SELECT_REDDIT, INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS, IStoreState } from './types';

export const selectReddit = (reddit: string): SelectActionType => {
  return {
    type: SELECT_REDDIT,
    reddit,
  };
};

export const invalidateReddit = (reddit: string): PostsActionType => {
  return {
    type: INVALIDATE_REDDIT,
    reddit,
  };
};

export const requestPosts = (reddit: string): PostsActionType => {
  return {
    type: REQUEST_POSTS,
    reddit,
  };
};

export const receivePosts = (reddit: string, json: { data: { children: Array<{ data: {id: string, title: string } }> } }): PostsActionType => {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
};

export const fetchPosts = (reddit: string): ThunkAction<void, IStoreState, unknown, Action<string>> => {

  return async (dispatch) => {
    
    dispatch(requestPosts(reddit));

    const response = await fetch(`http://www.reddit.com/r/${reddit}.json`);
    const json = await response.json();

    return dispatch(receivePosts(reddit, json));
  };
};

export const shouldFetchPosts = (state: IStoreState, reddit: string) => {
  const posts = state.postsByReddit[reddit];

  if (!posts) {
    return true;
  }

  if (posts.isFetching) {
    return false;
  }

  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = (reddit: string): ThunkAction<void, IStoreState, unknown, Action<string>> => {
  return (dispatch, getState) => {

    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
};