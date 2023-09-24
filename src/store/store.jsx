import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './reducers/recipeSlice.js'; 

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export default store;