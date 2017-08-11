const initialState = {
  nickname: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

    case 'GET_USER':
      return payload;
      break;

    default:
      return state;
      
  }
}
