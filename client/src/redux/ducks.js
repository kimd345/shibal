import remove from 'lodash.remove';

// Action Types

export const ADD_DOG = 'ADD_DOG';
export const DELETE_DOG = 'DELETE_DOG';
export const SELECT_DOG = 'SELECT_DOG';
export const UPDATE_DOG = 'UPDATE_DOG';

// Action Creators

export const addDog = (dog) => ({ type: ADD_DOG, payload: dog });
export const deleteDog = (id) => ({ type: DELETE_DOG, payload: id });
export const selectDog = (id) => ({ type: SELECT_DOG, payload: id });
export const updateDog = (dog) => ({ type: UPDATE_DOG, payload: dog });

// Reducers

const initialState = [];

const dogReducer = (state = initialState, action) => {};
