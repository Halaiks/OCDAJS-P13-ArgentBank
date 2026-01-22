import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
// Configuration du store Redux avec les slices d'authentification et d'utilisateur
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;