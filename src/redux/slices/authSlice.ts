import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") || null, // Persist login
};
export const dummyUser = {
    email: "testuser@gsynergy.com",
    password: "GSynergyTest!2025",
  };
  

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      localStorage.setItem("user", action.payload);
      localStorage.setItem("authToken", "auth" + action.payload); 
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("authToken"); 

    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
