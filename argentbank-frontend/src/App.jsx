import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "./store/authSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return (
    <><Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    <Footer /></>
  );
}

export default App;