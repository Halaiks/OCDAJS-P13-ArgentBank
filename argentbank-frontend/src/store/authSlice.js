import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk asynchrone pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Appel à l'API de connexion avec les identifiants de l'utilisateur
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
// Récupération de la réponse de l'API
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }
// Retour du token d'authentification en cas de succès
      return data.body.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Création du slice d'authentification avec les reducers et les extraReducers pour gérer les actions de connexion, de déconnexion et de restauration de session
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },

  reducers: {
// Action pour la déconnexion de l'utilisateur et suppression du token du localStorage 
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
// Action pour restaurer la session de l'utilisateur à partir du localStorage
    restoreSession: (state) => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        state.token = savedToken;
        state.isAuthenticated = true;
      }
      state.loading = false;
    },
  },
// Thunk asynchrone pour récupérer le profil de l'utilisateur
  extraReducers: (builder) => {
    builder
      // LOGIN en cours
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;

        // Save localStorage
        localStorage.setItem("token", action.payload);
      })

      // LOGIN ERROR
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;