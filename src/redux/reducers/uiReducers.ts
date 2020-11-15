import { UIActionTypes } from "../actions/uiActions/uiInterface";
import * as UiTypes from "../types";

export interface UiInitialState {
  loading: boolean;
  loadingModal: boolean;
  errors: any;
  openModal: boolean;
}

interface FormControl {
  errors?: string;
  email?: string;
  password?: string;
  loading?: boolean;
  wrongCredentials?: boolean;
  openModal: boolean;
}

const uiInitialState: UiInitialState = {
  loading: false,
  loadingModal: false,
  errors: undefined,
  openModal: false,
};

const UiReducer = (state = uiInitialState, action: UIActionTypes | any) => {
  switch (action.type) {
    case UiTypes.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case UiTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case UiTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: undefined,
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
    default:
      return state;
  }
};

export default UiReducer;
