// Action Types
const SET_USER = 'SET_USER';
const SET_CURRENT_DOG_ID = 'SET_CURRENT_DOG_ID';

const SET_DOG = 'SET_DOG';

const SET_DOGS = 'SET_DOGS';
const ADD_DOG = 'ADD_DOG';
const REMOVE_DOG = 'REMOVE_DOG';
const EMPTY_DOGS = 'EMPTY_DOGS';

const SET_LIKES = 'SET_LIKES';
const ADD_LIKE = 'ADD_LIKE';
const REMOVE_LIKE = 'REMOVE_LIKE';

const LOG_OUT = 'LOG_OUT';

// Action Creators
export const actions = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setCurrentDogId: (dogId) => ({ type: SET_CURRENT_DOG_ID, payload: dogId }),

  setDog: (dog) => ({ type: SET_DOG, payload: dog }),
  
  setDogs: (dogs) => ({ type: SET_DOGS, payload: dogs }),
  addDog: (dog) => ({ type: ADD_DOG, payload: dog }),
  removeDog: (dogId) => ({ type: REMOVE_DOG, payload: dogId }),
  emptyDogs: () => ({ type: EMPTY_DOGS }),

  setLikes: (likes) => ({ type: SET_LIKES, payload: likes }),
  addLike: (like) => ({ type: ADD_LIKE, payload: like }),
  removeLike: (like) => ({ type: REMOVE_LIKE, payload: like }),

  logOut: () => ({ type: LOG_OUT }),
};

// Reducers
const initialState = {
  user: {},
  dog: {},
  dogs: [],
  likes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_CURRENT_DOG_ID:
      return {
        ...state,
        user: { ...state.user, currentDogId: [action.payload] },
      };

    case SET_DOG:
      if (Object.keys(action.payload).length === 0) return state;
      return { ...state, dog: {...action.payload, label: action.payload.name, value: action.payload.id } };

    case SET_DOGS:
      if (Object.keys(action.payload).length === 0) return state;
      return { ...state, dogs: 
        action.payload.map(dog => {
          return { ...dog, label: dog.name, value: dog.id }
        })
      };

    case ADD_DOG:
      const dogsA = [ ...state.dogs, { ...action.payload, label: action.payload.name, value: action.payload.id } ];
      return { ...state, dogs: dogsA };

    case REMOVE_DOG:
      return { ...state, dogs: state.dogs.filter(dog => dog.id !== action.payload) };

    case EMPTY_DOGS:
      return { ...state, dog: {}, dogs: [], user: { ...state.user, currentDogId: [] } };

    case SET_LIKES:
      return { ...state, likes: action.payload };

    case ADD_LIKE:
      const likesA = [ ...state.likes, action.payload ]
      return { ...state, likes: likesA };

    case REMOVE_LIKE:
      const likesR = state.likes;
      const likeR = action.payload;
      for (let i = 0; i < likesR.length; i++) {
        let like = likesR[i];
        if ((like.dogId === likeR.dogId) && (like.postId === likeR.postId)) {
          const newLikesR =  [ ...likesR.slice(0, i), ...likesR.slice(i+1, likesR.length) ]
          return { ...state, likes: newLikesR };
        }
      }

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default rootReducer;
