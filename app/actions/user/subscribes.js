import Fetcher from '../../wrappers/Fetcher';
import alertify from 'alertify.js';

export const subscribe = (token, _id) => {
  return new Promise((resolve, reject) => {
    if (!token || !_id) reject();

    Fetcher(`/api/subscribes/${_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(json => {
        alertify.success('Subscribe added')
        resolve(json);
      })
  });
}

export const unsubscribe = (token, _id) => {
  return new Promise((resolve, reject) => {
    if (!token || !_id) reject();

    Fetcher(`/api/subscribes/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(json => {
        alertify.success('Subscribe removed')
        resolve(json)
      })
  });
}

export const getSubscribes = token => {
  return new Promise((resolve, reject) => {
    if (!token) reject();

    Fetcher(`/api/subscribes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(json => {
        console.log(json);
      })
  });
}
