import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: "",
    },
    filteredMovies: [], // Corrected typo: filteredMoives -> filteredMovies
    movieYears: [],
    uniqueYears: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilterMovies: (state, action) => {
      state.filteredMovies = action.payload; // Corrected typo: filteredMoives -> filteredMovies
    },
    setMoviesYear: (state, action) => {
      state.movieYears = action.payload; // Corrected typo: setMovieYears -> setMoviesYear for consistency
    },
    setUniqueYears: (state, action) => {
      state.uniqueYears = action.payload; // Corrected typo: uniqueYear -> uniqueYears for clarity
    },
  },
});

export const {
  setMoviesFilter,
  setFilterMovies,
  setMoviesYear,
  setUniqueYears,
} = moviesSlice.actions;

export default moviesSlice.reducer;
