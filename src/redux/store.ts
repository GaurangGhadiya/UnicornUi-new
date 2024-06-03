import { configureStore } from '@reduxjs/toolkit'
import profileUpdateSlice from './reducer/profileUpdateSlice'
import searchFilterSlice from './reducer/searchFilterSlice'


export const store = configureStore({
  // preloadedState,
  reducer: {
    search: searchFilterSlice,
    profileUpdate: profileUpdateSlice
  },
 
})