import { UIActionTypes } from "../actions/uiActions/uiInterface";
import * as UiTypes from "../types";

export interface UiInitialState {
  globalLoading: boolean;
  signLoading: boolean;
  loadingModal: boolean;
  openModal: boolean;
  homeView: boolean;
  congratzMsg: boolean;
}

interface FormControl {
  email?: string;
  password?: string;
  loading?: boolean;
  wrongCredentials?: boolean;
  openModal: boolean;
}

const uiInitialState: UiInitialState = {
  globalLoading: true,
  signLoading: false,
  loadingModal: false,
  openModal: false,
  homeView: false,
  congratzMsg: false,
};

const UiReducer = (state = uiInitialState, action: UIActionTypes | any) => {
  switch (action.type) {
    case UiTypes.SET_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: !state.globalLoading,
      };
    case UiTypes.SET_GLOBAL_LOADING_ON:
      return {
        ...state,
        globalLoading: true,
      };
    case UiTypes.SET_GLOBAL_LOADING_OFF:
      return {
        ...state,
        globalLoading: false,
      };
    case UiTypes.SET_SIGN_LOADING:
      return {
        ...state,
        signLoading: !state.signLoading,
      };
    case UiTypes.TOOGLE_MODAL:
      return {
        ...state,
        openModal: !state.openModal,
      };
    case UiTypes.SET_LOADING_MODAL:
    case UiTypes.POST_SAY:
      return {
        ...state,
        loadingModal: !state.loadingModal,
      };
    case UiTypes.SET_HOME_VIEW:
      return {
        ...state,
        homeView: true,
      };
    case UiTypes.CLEAR_HOME_VIEW:
      return {
        ...state,
        homeView: false,
      };
    case UiTypes.SET_CONGRATZ_MSG:
      return {
        ...state,
        congratzMsg: !state.congratzMsg,
      };
    default:
      return state;
  }
};

export default UiReducer;
