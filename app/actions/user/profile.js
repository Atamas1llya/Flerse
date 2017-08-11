import Fetcher from '../../wrappers/Fetcher';

export const getProfile = token => dispatch => {
  if (!token) return;

  Fetcher(`/api/profile`, {
    headers: {
      'Authorization': token
    }
  }, dispatch)
    .then(json => {
      console.log(json);
      dispatch({
        type: 'GET_USER',
        payload: json.user
      })
    })
}

export const updateProfile = (token, profile) => dispatch => {
  Fetcher(`/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(profile)
  }, dispatch)
    .then(json => {
      console.log(json);
    })
}

export const changeAvatar = (token, credentials) => {
  return new Promise((resolve, reject) => {
    Fetcher(`/api/profile/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(credentials)
    }, false)
      .then(json => {
        resolve();
      })
  });
}
