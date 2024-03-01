
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";
import { setUserAccessToken } from "api/axiosInstance";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";

export interface IuserData {
  email: string;
  password: string;
}

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }: { payload: IuserData }) => {
      state.userData = payload;
    },
    setAccessToken: (state, { payload }: { payload: string | null }) => {
      state.accessToken = payload;
      state.isLoggedIn = Boolean(payload);
      setUserAccessToken(payload);
    },
    logout: (state) => {

      state.isLoggedIn = false;
      state.userData = null;
      state.accessToken = null;
      deleteCookie("token")
    }
  },
  // extraReducers: {
  //   [HYDRATE]: (state, { payload }) => {
  //     return {
  //       ...state,
  //       ...payload?.userSlice,
  //     };
  //   },
  // },
});

export const { setUserData, logout, setAccessToken } =
  userSlice.actions;

export default userSlice.reducer;