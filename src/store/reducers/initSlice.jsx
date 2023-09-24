import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes : [],
};

const globalSlice = createSlice ({
    name: 'global',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
    },
});

export const {
    setRecipes,
} = globalSlice.actions;

export default globalSlice.reducer;