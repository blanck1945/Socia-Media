import * as UiTypes from "../../types";

export const setGlobalLoading = () => ({
  type: UiTypes.SET_GLOBAL_LOADING,
});

export const setGlobalLoadingOn = () => ({
  type: UiTypes.SET_GLOBAL_LOADING_ON,
});

export const setGlobalLoadingOff = () => ({
  type: UiTypes.SET_GLOBAL_LOADING_OFF,
});

export const setSignLoading = () => ({
  type: UiTypes.SET_SIGN_LOADING,
});

export const setLoadingModal = () => ({
  type: UiTypes.SET_LOADING_MODAL,
});

export const clearAllErrors = () => ({
  type: UiTypes.CLEAR_COMMENTS,
});

export const setCongratzMsg = () => ({
  type: UiTypes.SET_CONGRATZ_MSG,
});

export const toogleModal = () => ({
  type: UiTypes.TOOGLE_MODAL,
});

export const setHomeView = () => ({
  type: UiTypes.SET_HOME_VIEW,
});

export const clearHomeView = () => ({
  type: UiTypes.CLEAR_HOME_VIEW,
});
