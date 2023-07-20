//rxslice 
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //Actions
    SET_ACTIVE_USER: (state, action ) => {
      // console.log( "#################")
      // console.log('action.payload ', action.payload );
      const {email, userName, userId} = action.payload  
      state.isLoggedIn = true;
      state.email =email ;// action.payload.email;
      state.userName = userName; //action.payload.userName;
      state.userId = userId;
    },

    REMOVE_ACTIVE_USER(state, action ) { // different style of writing an action; different from the top action
      state.isLoggedIn = false;
      state.email = null ;
      state.userName = null ;
      state.userId = null ;
    }
  }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = AuthSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserId = (state) => state.auth.userId
export default AuthSlice.reducer