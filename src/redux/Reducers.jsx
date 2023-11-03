import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    user: null,
    errorMessage: "",
  },
  movies: {
    data: [],
  },
  detail: {
    detail: [],
  },
  search: {
    searchResult: [],
  },
  loadingDanError: {
    loading: true,
    error: "",
  },
};

const appSlicer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }

      state.auth.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.auth.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.auth.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.auth.errorMessage = action.payload;
    },
    setMovieData: (state, action) => {
      state.movies.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loadingDanError.loading = action.payload;
    },
    setError: (state, action) => {
      state.loadingDanError.error = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.detail.detail = action.payload;
    },
    setSearchResult: (state, action) => {
      state.search.searchResult = action.payload;
    },
  },
});

export const { setToken, setIsLoggedIn, setUser, setErrorMessage, setMovieData, setLoading, setError, setMovieDetail, setSearchResult } = appSlicer.actions;

export default appSlicer.reducer;
