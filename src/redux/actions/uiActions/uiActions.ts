import * as UiTypes from "../../types";

export const setLoading = () => ({
  type: UiTypes.SET_LOADING,
});

export const setLoadingModal = () => ({
  type: UiTypes.SET_LOADING_MODAL,
});

export const setErrors = (errors) => ({
  type: UiTypes.SET_ERRORS,
  payload: errors,
});

export const clearAllErrors = () => ({
  type: UiTypes.CLEAR_ERRORS,
});

export const toogleModal = () => ({
  type: UiTypes.TOOGLE_MODAL,
});
