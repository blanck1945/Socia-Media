import * as UiTypes from "../../types";

export interface LOADING_ACTION_TYPE {
  type: typeof UiTypes.SET_LOADING;
}

export interface LOADING_MODEL_ACTION_TYPE {
  type: typeof UiTypes.SET_LOADING_MODAL;
}

export interface SET_ERRORS_ACTION_TYPE {
  type: typeof UiTypes.SET_ERRORS;
  payload: any;
}

export interface CLEAR_ERRORS_ACTION_TYPE {
  type: typeof UiTypes.CLEAR_ERRORS;
}

export interface TOOGLE_MODAL_ACTION_TYPE {
  type: typeof UiTypes.TOOGLE_MODAL;
}

export type UIActionTypes =
  | LOADING_ACTION_TYPE
  | SET_ERRORS_ACTION_TYPE
  | CLEAR_ERRORS_ACTION_TYPE
  | TOOGLE_MODAL_ACTION_TYPE
  | LOADING_MODEL_ACTION_TYPE;
