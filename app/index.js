import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';

import Banner from './components/Banner';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';

import Header from './components/Header';
import Blog from './components/Blog';
import Feed from './components/Feed';

import Settings from './components/Settings';

import './less/index.less';


const middleware = routerMiddleware(browserHistory);
import reducer from './reducers';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, middleware)));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/feed"></IndexRedirect>
        <Route path="/about" component={Banner} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route component={Header}>
          <Route path="/user/:nickname" component={Blog} />
          <Route path="/feed" component={Feed} />
          <Route path="/settings" component={Settings} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
