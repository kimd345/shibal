// Action Types
const SET_USER = 'SET_USER';
const SET_DOG = 'SET_DOG';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setDog: (dog) => ({ type: SET_DOG, payload: dog }),
};

// Reducers
const initialState = {
  user: {},
  dog: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_DOG:
      return { ...state, dog: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
