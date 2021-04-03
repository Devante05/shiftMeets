import React, { createContext, useReducer, useContext } from "react";
// Don't forget to import all of your actions!
import {
  GET_POSTS,
  ADD_POST,
  REMOVE_POST,
  SET_CURRENT_POST,
  LOADING
} from "./actions.js";


const StoreContext = createContext();
const { Provider } = StoreContext;

const initialState = {
  posts: [],
  currentPost: {
    _id: 0,
    title: "",
    body: "",
    author: ""
  },
  favorites: [],
  loading: false
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.posts],
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts],
        loading: false
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item._id !== action._id),
        loading: false
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.post,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
