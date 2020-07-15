import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
// import { IStoreState } from './types';

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

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default createStoreWithMiddleware(rootReducer); // reducer 넣기
