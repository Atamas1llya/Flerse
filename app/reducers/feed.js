const initialState = {
  common: [],
  subscribed: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'GET_FEED') {
    return {
      ...state,
      common: payload
    };
  } else if (type === 'GET_SUBSCRIBED_FEED') {
    return {
      ...state,
      subscribed: payload
    }
  }

  return state;
}
