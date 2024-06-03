import { createSlice } from '@reduxjs/toolkit';

let localData = localStorage.getItem('logindata');
const initialState = {
  userProfileData: localData ? JSON.parse(localData) : null,
  isForgot: '1',
  isOpenModal: false,
  isAuth: localData ? true : false,
  notificationCount: 0,
  savedCount: 0
};

const profileUpdateSlice = createSlice({
  name: 'profileUpdate',
  initialState,
  reducers: {
    userLogin: (state, { payload }) => {
      state.userProfileData = payload;
      state.isAuth = true;
      state.isOpenModal = false;
    },
    profileUpdate: (state, { payload }) => {
      state.userProfileData = payload;
    },
    logOutProfile: (state) => {
      state.userProfileData = null;
      state.isAuth = false;
      state.notificationCount = 0;
      state.savedCount = 0;
      //   localStorage.removeItem('logindata');
      // localStorage.removeItem('token');
      // localStorage.removeItem('socialAccData');
    },
    openModal: (state, { payload }) => {
      state.isForgot = payload;
    },
    savedCount: (state, { payload }) => {
      state.savedCount = payload;
    },
    isOpenModal: (state, { payload }) => {
      console.log('payload', payload);
      state.isOpenModal = payload;
    },
    notificationCount: (state, { payload }) => {
      state.notificationCount = payload;
    }
  }
});

export const {
  profileUpdate,
  logOutProfile,
  userLogin,
  openModal,
  isOpenModal,
  notificationCount,
  savedCount
} = profileUpdateSlice.actions;
export const userProfile = (state: any) => state.profileUpdate?.userProfileData;
export const getSavedCount = (state: any) => state.profileUpdate?.savedCount;
export const openPopUp = (state: any) => state.profileUpdate?.isForgot;
export const getAuth = (state: any) => state.profileUpdate?.isAuth;
export const modalFlag = (state: any) => state.profileUpdate?.isOpenModal;
// export const modalFlag = (state: any) => state.isOpenModal?.isOpenModal;
export const notiCount = (state: any) => state.profileUpdate?.notificationCount;
export default profileUpdateSlice.reducer;
