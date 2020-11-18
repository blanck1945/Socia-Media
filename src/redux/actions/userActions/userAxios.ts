import Axios from "axios";
import { Dispatch } from "react";
import { axiosFetcher, axiosSender } from "../../../api/fetcher";
import { setLoadingData } from "../dataActions/dataActions";
import { axiosGetSayings } from "../dataActions/dataAxios";
import { clearAllErrors, setErrors, setLoading } from "../uiActions/uiActions";
import { setLoadingUser, setUnauthenticated, setUserData } from "./userActions";

export interface UserInterface {
  email: string;
  password: string;
  user?: string;
  confirmPassword?: string;
}

export const AxiosSignUpUser = (user: UserInterface, router) => async (
  dispatch
) => {
  dispatch(setLoading());
  console.log("loading state change");

  try {
    const data = await axiosSender(user, "auth/signup");
    setAuthHeader(data.token);
    await dispatch(getUserData());
    dispatch(clearAllErrors());

    router.push("/");
  } catch (err) {
    err.response.data.errors
      ? dispatch(
          setErrors({
            msg: err.response.data.msg,
            email:
              err.response.data.errors.length === 1 &&
              err.response.data.errors[0].email
                ? "Email " + err.response.data?.errors[0]?.email
                : err.response.data.errors.length > 1
                ? "Email " + err.response.data?.errors[0]?.email
                : null,
            password:
              err.response.data.errors.length === 1 &&
              err.response.data.errors[0].password
                ? "Password " + err.response.data?.errors[0].password
                : err.response.data.errors.length > 1
                ? "Password " + err.response.data?.errors[1].password
                : null,
          })
        )
      : dispatch(
          setErrors({
            msg: err.response.data.msg,
            email:
              err.response.data.email !== undefined
                ? err.response.data.email
                : null,
            password:
              err.response.data.password !== undefined
                ? err.response.data.password
                : null,
            wrongCredentials: true,
          })
        );
  }
};

export const AxiosLoginUser = (user: UserInterface, router) => async (
  dispatch
) => {
  dispatch(setLoading());

  try {
    const data = await axiosSender(user, "auth/signin");

    setAuthHeader(data.token);
    await dispatch(getUserData());
    dispatch(clearAllErrors());

    router.push("/");
  } catch (err) {
    err.response.errors
      ? dispatch(
          setErrors({
            msg: err.response.msg,
            email:
              err.response.data.errors.length === 1 &&
              err.response.data.errors[0].email
                ? "Email " + err.response.data?.errors[0]?.email
                : err.response.data.errors.length > 1
                ? "Email " + err.response.data?.errors[0]?.email
                : null,
            password:
              err.response.data.errors.length === 1 &&
              err.response.data.errors[0].password
                ? "Password " + err.response.data?.errors[0].password
                : err.response.data.errors.length > 1
                ? "Password " + err.response.data?.errors[1].password
                : null,
          })
        )
      : dispatch(
          setErrors({
            msg: err.response.msg,
            email:
              err.response.data.email !== undefined
                ? err.response.data.email
                : null,
            password:
              err.response.data.password !== undefined
                ? err.response.data.password
                : null,
            wrongCredentials: true,
          })
        );
  }
};

export const uploadImage = (formData: any) => async (dispatch) => {
  dispatch(setLoadingUser());
  try {
    const data = await axiosSender(formData, "user/image");
    console.log(data);
    dispatch(axiosGetSayings());
    dispatch(getUserData());
  } catch (err) {
    dispatch(setLoadingData());
  }
};

export const axiosLogOut = (router) => (dispatch: Dispatch<any>) => {
  localStorage.removeItem("FBIdToken");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch(setUnauthenticated());
};

export const axiosEditUserDetails = (userDetails: any) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoadingUser());
  try {
    await axiosSender(userDetails, "user/update-user");
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const setAuthHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  Axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const getUserData = (token?) => async (dispatch: Dispatch<any>) => {
  dispatch(setLoadingUser());
  if (!Axios.defaults.headers.common["Authorization"]) {
    setAuthHeader(token.split("Bearer ")[1]);
  }
  const user = await axiosFetcher("user/user-credentials");
  console.log(user)
  dispatch(setUserData(user.data));
};
