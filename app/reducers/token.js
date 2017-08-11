const initialState = localStorage.getItem('token');

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_TOKEN':

      localStorage.setItem('token', payload);
      return payload;
      break;

    case 'REMOVE_TOKEN':

      localStorage.removeItem('token');
      return '';
      break;
    default:
      return state;
  }
}
