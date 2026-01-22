import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk asynchrone pour récupérer le profil de l'utilisateur connecté
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// Thunk asynchrone pour mettre à jour le prénom et le nom de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
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