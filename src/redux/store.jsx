import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./Reducers";
import thunk from "redux-thunk";

// Create the store
export default configureStore({
  reducer: appReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // It not necessary if your feature is not too complex, you can just comment this line if you don't need it
});
