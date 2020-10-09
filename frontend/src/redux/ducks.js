// Action Types
const SET_USER = 'SET_USER';
const SET_DOG = 'SET_DOG';
const ADD_DOGS = 'ADD_DOGS';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setDog: (dog) => ({ type: SET_DOG, payload: dog }),
  addDogs: (dogId, dog) => ({ type: ADD_DOGS, payload: { dogId, dog } }),
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

    case ADD_DOGS:
      const currentDogId = [action.payload.dogId];
      const dogs = [...state.user.dogs, action.payload.dog];
      return { ...state, user: { ...state.user, currentDogId, dogs } };

    default:
      return state;
  }
};

export default rootReducer;
