import { setUser, setIsLoggedIn, setToken, setErrorMessage, setMovieData, setLoading, setError, setMovieDetail, setSearchResult } from "./Reducers";
import axios from "axios";

export const registerLoginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/v1/auth/google`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    dispatch(setToken(response.data.data.token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe());
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response.data.message);
      return;
    }
    console.error(error.message);
  }
};

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_API}/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setErrorMessage(error.response.data));
      console.error(error.response.data.message);
      return;
    }
    console.error(error.message);
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_API}/v1/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setErrorMessage(error.response.data));
      console.error(error.response.data.message);
      return;
    }
    console.error(error.message);
  }
};

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    if (navigate) {
      navigate("/");
      window.location.reload();
    }
  } catch (error) {
    console.error(error?.message);
  }
};

export const getMe = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    if (!token) return;

    const response = await axios.get(`${import.meta.env.VITE_API}/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUser(response.data.data.name));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        dispatch(logout(null));
        return;
      }

      console.error(error.response.data.message);
      return;
    }
  }
};
export const fetchMovies = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const { token } = getState().auth;
    const movies = await axios.get(`${import.meta.env.VITE_API}/v1/movie/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setMovieData(movies.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};

export const getMovieDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const { token } = getState().auth;
    const movies = await axios.get(`${import.meta.env.VITE_API}/v1/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setMovieDetail(movies.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};

export const getSearchResult = (query) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const { token } = getState().auth;
    const movies = await axios.get(`${import.meta.env.VITE_API}/v1/search/movie?page=1&query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setSearchResult(movies.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};
