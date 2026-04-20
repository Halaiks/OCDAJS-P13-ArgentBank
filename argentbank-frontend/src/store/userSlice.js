import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

// Thunk asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      // Récupération du token d'authentification depuis le state Redux
      const token = getState().auth.token;
      // Appel à l'API pour récupérer le profil de l'utilisateur avec le token dans les headers
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            // Ajout du token d'authentification dans les headers de la requête
            Authorization: `Bearer ${token}`,
          },
        }
      );
// Retour du profil de l'utilisateur en cas de succès
      return response.data.body;
      // Gestion des erreurs, notamment pour les cas de token expiré ou non autorisé
    } catch (error) {
      if (
        error.response?.status === 401 ||
        error.response?.data?.message === "jwt expired"
      ) {
        dispatch(logout());
      }

      return rejectWithValue(error.response?.data?.message);
    }
  }
);


// Thunk asynchrone pour mettre à jour le prénom et le nom de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ firstName, lastName }, { getState, rejectWithValue, dispatch }) => {
    try {
      // Récupération du token d'authentification depuis le state Redux
      const token = getState().auth.token;
      // Appel à l'API pour mettre à jour le profil de l'utilisateur avec les nouvelles données et le token dans les headers
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
// Retour du profil mis à jour de l'utilisateur en cas de succès
      return response.data.body;
      // Gestion des erreurs, notamment pour les cas de token expiré ou non autorisé
    } catch (error) {
      if (
        error.response?.status === 401 ||
        error.response?.data?.message === "jwt expired"
      ) {
        // En cas d'erreur d'authentification, on déclenche l'action de déconnexion pour nettoyer la session utilisateur
        dispatch(logout());
      }

      return rejectWithValue(error.response?.data?.message);
    }
  }
);
// Création du slice d'utilisateur avec les reducers et les extraReducers pour gérer les actions de récupération et de mise à jour du profil utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Pour récupération profil utilisateur
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      // Pour mise à jour profil utilisateur
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      // Pour récupération profil utilisateur en cas d'erreur
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // Pour mise à jour profil utilisateur
      .addCase(updateUserProfile.pending, (state) => {
  state.loading = true;
})
.addCase(updateUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload;
})
.addCase(updateUserProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
});

export default userSlice.reducer;