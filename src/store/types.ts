/**
 * value of action.type
 */
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/**
 * type of action object
 */
export interface ISelcetRedditAction {
  type: typeof SELECT_REDDIT;
  reddit: string;
}

export interface IInvalidateRedditAction {
  type: typeof INVALIDATE_REDDIT;
  reddit: string;
}

export interface IRequestPostsAction {
  type: typeof REQUEST_POSTS;
  reddit: string;
}

export interface IReceivePostsAction {
  type: typeof RECEIVE_POSTS;
  reddit: string;
  posts: IPost[];
  receivedAt: number;
}

export type SelectActionType = ISelcetRedditAction;

export type PostsActionType = IInvalidateRedditAction | IRequestPostsAction | IReceivePostsAction;

/**
 * types relative to store state
 */
export type SelectedRedditType = 'frontend' | 'reactjs'

export interface IPost {
  id: string;
  title: string;
}

export interface ISubReddit {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated?: number;
  items: IPost[];
}

export interface IPostsByReddit {
  [index: string]: ISubReddit;
}

export interface IStoreState {
  selectedReddit: SelectedRedditType;
  postsByReddit: IPostsByReddit;
}
