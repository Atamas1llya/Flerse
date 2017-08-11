import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';
import { push } from 'react-router-redux';

import { getProfile } from './user/profile';

export const signup = credentials => dispatch => {
  Fetcher('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }, dispatch)
    .then(json => {

      if (json.success) {
        dispatch(getProfile(json.token));
        dispatch({
          type: 'SET_TOKEN',
          payload: json.token
        })
        dispatch(push('/feed'));
        alertify.success(json.message);
      } else {
        alertify.error(json.message);
      }

    })
}

export const checkNickname = nickname => {
  return new Promise((resolve, reject) => {
    Fetcher('/api/signup/nickname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname })
    }, false)
      .then(json => {
        resolve(json.uniqueness);
      })
  });
}

export const checkEmail = email => {
  return new Promise((resolve, reject) => {
    Fetcher('/api/signup/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }, false)
      .then(json => {
        resolve(json.uniqueness)
      })
  });
}


export const signin = credentials => dispatch => {
  Fetcher('/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }, dispatch)
    .then(json => {

      if (json.success) {
        dispatch(getProfile(json.token));
        dispatch({
          type: 'SET_TOKEN',
          payload: json.token
        })
        dispatch(push('/feed'));
      } else
        alertify.error(json.message);

    })
}
