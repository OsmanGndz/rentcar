import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  role: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  role: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.loading = false;
    },
  },
});

export const { setUser, setRole, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
