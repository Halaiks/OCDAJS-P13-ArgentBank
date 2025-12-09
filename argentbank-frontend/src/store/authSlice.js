import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// LOGIN: récupère le token depuis l'API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      return data.body.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    restoreSession: (state) => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        state.token = savedToken;
        state.isAuthenticated = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN START
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