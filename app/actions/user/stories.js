import Fetcher from '../../wrappers/Fetcher';
import alertify from 'alertify.js';

export const newStory = (token, story) => {
  return new Promise((resolve, reject) => {
    if (!token || !story) reject();
    Fetcher(`/api/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(story)
    })
      .then(json => {

        if (json.success) {
          alertify.success(json.message);
          resolve();
        }

        console.log(json);
      })
  });
}
