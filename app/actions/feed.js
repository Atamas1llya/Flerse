import Fetcher from '../wrappers/Fetcher';

export const getFeed = () => dispatch => {
  Fetcher('/api/feed', {}, dispatch)
    .then(json => {
      dispatch({
        type: 'GET_FEED',
        payload: json.feed
      })
    })
}

export const getSubscribedFeed = token => dispatch => {
  Fetcher('/api/subscribes', {
    headers: {
      'Authorization': token
    }
  }, dispatch)
    .then(json => {
      console.log(json);
      dispatch({
        type: 'GET_SUBSCRIBED_FEED',
        payload: json.feed
      })
    })
}
