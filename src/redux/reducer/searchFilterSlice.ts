import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  searchFilter: '',
}


const searchFilterSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

   
    searching: (state, { payload }) => {
      state.searchFilter = payload
    }

  },


})

export const { searching } = searchFilterSlice.actions
export const getFilter = (state:any) => state.search?.searchFilter
export default searchFilterSlice.reducer
