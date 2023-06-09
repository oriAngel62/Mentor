import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authState: "",
  },
  reducers: {
    setAuthState: (state, action) => {
      console.log("Action", action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.authState = action.payload
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE", action);
      if(action.payload.auth.authState === false) {
        return{
          ...state,
        }
      }
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
})

// Action creators are generated for each case reducer function
export const { setAuthState } = authSlice.actions

export const selectAuthState = (state) => state.auth.authState;


export default authSlice.reducer