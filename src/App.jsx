import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MovieDetail from "./Pages/Detail";
import SearchResult from "./Pages/Result";
import Home from "./Pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/detail/:id" element={<MovieDetail />} />
              <Route path="/results/:query" element={<SearchResult />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
