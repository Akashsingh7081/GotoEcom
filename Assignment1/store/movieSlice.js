// src/redux/movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    addMovie: (state, action) => {
      if (!state.find(movie => movie.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeMovie: (state, action) => state.filter(movie => movie.id !== action.payload)
  }
});

export const { addMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;