import Fetcher from '../wrappers/Fetcher';

export const getUser = (token, nickname) => {
  return new Promise((resolve, reject) => {
    Fetcher(`/api/users/${nickname}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(json => {
        resolve(json.user)
      })
  });
}
