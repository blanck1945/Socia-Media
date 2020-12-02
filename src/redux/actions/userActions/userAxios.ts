import Axios from "axios";
import { Dispatch } from "react";
import { axiosFetcher, axiosSender } from "../../../api/fetcher";
import {
  setDataStateToInitial,
  setLoadingData,
} from "../dataActions/dataActions";
import { axiosGetSayings } from "../dataActions/dataAxios";
import {
  setCongratzMsg,
  setGlobalLoading,
  setSignLoading,
} from "../uiActions/uiActions";
import {
  setLoadingUser,
  setUnauthenticated,
  setUserData,
  setUserStateToInitial,
} from "./userActions";

export interface UserInterface {
  email: string;
  password: string;
  user?: string;
  confirmPassword?: string;
}

interface CredentialsResponse {
  msg: string;
  state: boolean;
  userData: any;
}

export const AxiosCheckCredentials = () => async (dispatch: Dispatch<any>) => {
  try {
    const data: CredentialsResponse = await axiosFetcher("user/credentials");
    dispatch(setUserData(data.userData));
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const AxiosSignUpUser = (user: UserInterface, router) => async (
  dispatch
) => {
  dispatch(setGlobalLoading());

  try {
    await axiosSender(user, "auth/signup");
    dispatch(setCongratzMsg());
    //await dispatch(getUserData());
    setTimeout(() => {
      router.push("/signIn");
    }, 5000);
  } catch (err) {
    console.log(err);
  }
};

export const AxiosLoginUser = (user: UserInterface, router) => async (
  dispatch
) => {
  dispatch(setSignLoading());

  try {
    const data = await axiosSender(user, "auth/signin");
    console.log(data);
    dispatch(setUserData(data.userData));
    //dispatch(AxiosCheckCredentials());
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};

interface AxiosImgResponse {
  msg: string;
  mongoUser: any;
}

export const AxiosUploadImg = (formData: any) => async (dispatch) => {
  dispatch(setGlobalLoading());
  try {
    const data: AxiosImgResponse = await axiosSender(formData, "user/image");
    console.log(data);
    dispatch(axiosGetSayings());
    dispatch(AxiosCheckCredentials());
  } catch (err) {
    dispatch(setLoadingData());
  }
};

export const axiosLogOut = (router) => (dispatch: Dispatch<any>) => {
  dispatch(setDataStateToInitial());
  dispatch(setUserStateToInitial());
  dispatch(setUnauthenticated());
};

export const axiosEditUserDetails = (userDetails: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    await axiosSender(userDetails, "user/update-user");
    dispatch(AxiosCheckCredentials());
  } catch (err) {
    console.log(err);
  }
};

// export const setAuthHeader = (token) => {
//   if (token.startsWith("Bearer ")) {
//     Axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     const completeToken = "Bearer " + token;
//     Axios.defaults.headers.common["Authorization"] = completeToken;
//   }
// };

export const getUserData = () => async (dispatch: Dispatch<any>) => {
  //dispatch(setGlobalLoading());

  try {
    const user = await axiosFetcher("user/credentials");
    dispatch(setUserData(user.data));
  } catch (err) {
    console.log(err);
  }
};
