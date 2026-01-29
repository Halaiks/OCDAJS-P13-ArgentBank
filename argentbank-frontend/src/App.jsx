import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./store/authSlice";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <><Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>

    <Footer /></>
  );
}

export default App;