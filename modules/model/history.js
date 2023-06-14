import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";


export const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyState: [],
  },
  reducers: {
    setHistoryState: (state, action) => {
      console.log("Action", action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.historyState = action.payload
    },
    addHistory: (state, action) => {
        console.log("Action", action);
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.historyState.push(action.payload)
    },
    addAllHistory: (state, action) => {
        console.log("Action", action);
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.historyState = state.historyState.concat(action.payload)
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE", action);
      if(action.payload.history.historyState === []) {
        return{
          ...state,
        }
      }
      return {
        ...state,
        ...action.payload.history,
      };
    });
  },
})

// Action creators are generated for each case reducer function
export const { setHistoryState, addHistory, addAllHistory } = historySlice.actions

export const selectHistoryState = (state) => state.history.historyState;


export default historySlice.reducer