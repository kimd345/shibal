import remove from 'lodash.remove';

// Action Types

export const actionTypes = {
  ADD_DOG: 'ADD_DOG',
  DELETE_DOG: 'DELETE_DOG',
  SELECT_DOG: 'SELECT_DOG',
  UPDATE_DOG: 'UPDATE_DOG',
};

// Action Creators
export const actions = {
  addDog: (dog) => ({ type: ADD_DOG, payload: dog }),
  deleteDog: (id) => ({ type: DELETE_DOG, payload: id }),
  selectDog: (id) => ({ type: SELECT_DOG, payload: id }),
  updateDog: (dog) => ({ type: UPDATE_DOG, payload: dog }),
};

// Reducers

const initialState = {
  dogs: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DOG:
      return { ...state, dogs: [...state.dogs, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
