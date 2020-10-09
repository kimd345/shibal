// Action Types
const SET_USER = 'SET_USER';
const SET_DOG = 'SET_DOG';
const SET_CURRENT_DOG_ID = 'SET_CURRENT_DOG_ID';
const ADD_DOG = 'ADD_DOG';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setDog: (dog) => ({ type: SET_DOG, payload: dog }),
  setCurrentDogId: (dogId) => ({ type: SET_CURRENT_DOG_ID, payload: dogId }),
  addDogs: (dog) => ({ type: ADD_DOG, payload: dog }),
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

    case SET_CURRENT_DOG_ID:
      return {
        ...state,
        user: { ...state.user, currentDogId: [action.payload] },
      };

    case ADD_DOG:
      const dogs = [...state.user.dogs, action.payload];
      return { ...state, user: { ...state.user, dogs } };

    default:
      return state;
  }
};

export default rootReducer;
