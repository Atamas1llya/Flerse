import alertify from 'alertify.js';
import { push } from 'react-router-redux';

const Fetcher = (url, settings, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(url, settings)
    .then(res => {
      switch (res.status) {
        case 401:
          alertify.error('Wrong credentials!');
          dispatch(push('/'));
          break;
        case 403:
          dispatch({
            type: 'REMOVE_TOKEN'
          });
          alertify.error('Your session time expired, please login again!');
          dispatch(push('/signin'));
          break;
        case 409:
          alertify.error('User already exists!')
          break;
        case 500:
          alertify.error('Ooops. Something went wrong...')
          dispatch(push('/signin'));
          break;
        case 404:
          alertify.error('404: Not Found')
          break;

        case 400:
          alertify.error('400: check your data!')
          break;

        case 200:
          return res.json();
          break;

        default:
          alertify.error('Oops. Unknown error: ' + res.status)
      }

      return res.json();
    })
      .then(json => {
        if (json.success) {
          resolve(json);
        } else {
          alertify.error(json.message);
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}
export default Fetcher;
