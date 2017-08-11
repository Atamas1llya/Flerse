import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import user from './user';
import feed from './feed';

export default combineReducers({
  routing: routerReducer,
  token,
  user,
  feed
})
