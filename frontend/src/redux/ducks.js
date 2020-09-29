// Action Types
const SET_USER = 'SET_USER';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
};

// Reducers
const initialState = {
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
