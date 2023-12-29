import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseLogin,firebaseRegister } from '../utils/FirebaseUtils';
import { addTokenToSessionStorage,getTokenFromSessionStorage,removeTokenFromSessionStorage } from '../utils/SessionStorageUtils.js';

// Create Async Thunk for Login
export const loginAsyncThunk = createAsyncThunk(
    'authentication/login',
    async ({ email,password }) =>
    {
        try
        {
            const response = await firebaseLogin(email,password);
            return { email: response.user.email,token: response.user.refreshToken,refreshToken: response.user.refreshToken };
        } catch (error)
        {
            throw new Error(error);
        }
    }
);

// Create Async Thunk for Register
export const registerAsyncThunk = createAsyncThunk(
    'authentication/register',
    async ({ email,password }) =>
    {
        try
        {
            const response = await firebaseRegister(email,password);
            return { email: response.user.email,token: response.user.refreshToken,refreshToken: response.user.refreshToken };

        } catch (error)
        {
            throw new Error(error);
        }
    }
);

// Create Slice
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        userToken: getTokenFromSessionStorage(),
        isLoading: false,
    },
    reducers: {
        // Logout
        logout: (state) =>
        {
            state.userToken = null;
            state.isLoading = false;
            removeTokenFromSessionStorage(); // Remove token from session storage on logout
        },
    },
    extraReducers: {
        // Login Async Thunk
        [loginAsyncThunk.pending]: (state) =>
        {
            state.isLoading = true;
        },
        [loginAsyncThunk.fulfilled]: (state,action) =>
        {
            state.isLoading = false;
            state.userToken = action.payload;
            addTokenToSessionStorage(action.payload.token); // Store the token in session storage on successful login
        },
        [loginAsyncThunk.rejected]: (state) =>
        {
            state.isLoading = false;
        },
        // Register Async Thunk
        [registerAsyncThunk.pending]: (state) =>
        {
            state.isLoading = true;
        },
        [registerAsyncThunk.fulfilled]: (state,action) =>
        {
            state.isLoading = false;
            state.userToken = action.payload;
            // addTokenToSessionStorage(action.payload.token); // Store the token in session storage on successful registration
        },
        [registerAsyncThunk.rejected]: (state) =>
        {
            state.isLoading = false;
        },
    },
});

// Export Actions
export default authenticationSlice.reducer;
export const { logout } = authenticationSlice.actions;
