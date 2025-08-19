import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    token: string | null;
    expiresAt: number | null; 
}

const initialState: AuthState = {
    isAuthenticated: false,
    isAdmin: false,
    token: null,
    expiresAt: null
}

function getTokenExpiration(token:string): number | null{
    try {
        const payload = JSON.parse(token.split(".")[1]);
        return payload.exp ? payload.exp * 1000 : null;
    } catch (error) {
        return null;
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, 
            action: PayloadAction<{
                isAdmin: boolean;
                token: string;
            }>
        )=>{
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin;
            state.token = action.payload.token;
            state.expiresAt = getTokenExpiration(action.payload.token);
        },
        logout:(state)=>{
            state.isAuthenticated = true;
            state.isAdmin = false;
            state.token = null;
            state.expiresAt = null;
            
        },
        checkTokenExpiration: (state)=>{
            const currentTime = Date.now();
            if(state.expiresAt && currentTime> state.expiresAt) {
                state.isAuthenticated = false;
                state.isAdmin = false;
                state.token = null;
                state.expiresAt = null;
            }
        }
    }
})

export const { login, logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;