import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./store/authSlice";
import { fetchUserProfile } from "./store/userSlice";

// Composant de route privée pour protéger les routes nécessitant une authentification
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};
// Composant principal de l'application qui gère les routes et la session utilisateur
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // Récupération de l'état d'authentification depuis le store Redux pour conditionner l'accès aux routes privées
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

//  Restauration de la session utilisateur à partir du localStorage lors du chargement de l'application
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  // Fetch profile quand connecté
useEffect(() => {
  if (isAuthenticated && token) {
    dispatch(fetchUserProfile());
  }
}, [isAuthenticated,token, dispatch]);

if (loading) return null;
// Configuration des routes de l'application avec les composants correspondants et protection des routes privées avec le composant PrivateRoute
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